<?php declare(strict_types=1);

namespace MagediaPropertyBanner\Services;

use Doctrine\DBAL\Connection;
use Exception;
use MagediaPropertyBanner\Models\Banner\Banner;
use PDO;
use Shopware\Bundle\StoreFrontBundle\Service\ContextServiceInterface;
use Shopware\Components\Compatibility\LegacyStructConverter;

class PropertyBannerManager
{
    /**
     * @var ContextServiceInterface
     */
    private $context;

    /**
     * @var LegacyStructConverter
     */
    private $converter;

    /**
     * @var Connection
     */
    private $connection;

    public function __construct(
        ContextServiceInterface $context,
        LegacyStructConverter $converter,
        Connection $connection
    ) {
        $this->context = $context;
        $this->converter = $converter;
        $this->connection = $connection;
    }

    /**
     * Get banners to display in the property
     *
     * @param int $sProperty
     * @param int $limit
     *
     * @return array|false Contains all information about the banner-object
     * @throws Exception
     */
    public function sPropertyBanner(int $sProperty, int $limit = 1)
    {
        $limit = (int) $limit;
        try {
            $bannerRepository = Shopware()->Models()->getRepository(Banner::class);
            $bannerQuery = $bannerRepository->getAllActiveBanners($sProperty, $limit);
            if ($bannerQuery) {
                $getBanners = $bannerQuery->getArrayResult();
            } else {
                return [];
            }
        } catch (Exception $e) {
            return false;
        }

        $desktopImages = array_column($getBanners, 'desktopImage');
        $mobileImages = array_column($getBanners, 'mobileImage');
        $mediaService = Shopware()->Container()->get('shopware_media.media_service');

        array_walk($desktopImages, function (&$image) use ($mediaService) {
            $image = $mediaService->normalize($image);
        });

        array_walk($mobileImages, function (&$image) use ($mediaService) {
            $image = $mediaService->normalize($image);
        });

        $desktopMediaIds = $this->getMediaIdsOfPath($desktopImages);
        $mobileMediaIds = $this->getMediaIdsOfPath($mobileImages);
        $context = $this->context->getShopContext();
        $desktopMedias = Shopware()->Container()->get('shopware_storefront.media_service')->getList($desktopMediaIds, $context);
        $mobileMedias = Shopware()->Container()->get('shopware_storefront.media_service')->getList($mobileMediaIds, $context);

        foreach ($getBanners as &$getAffectedBanners) {
            // converting to old format
            $getAffectedBanners['valid_from'] = $getAffectedBanners['validFrom'];
            $getAffectedBanners['valid_to'] = $getAffectedBanners['validTo'];
            $getAffectedBanners['link_target'] = $getAffectedBanners['linkTarget'];
            $getAffectedBanners['propertyID'] = $getAffectedBanners['propertyId'];

            $getAffectedBanners['desktop_img'] = $getAffectedBanners['desktopImage'];
            $getAffectedBanners['mobile_img'] = $getAffectedBanners['mobileImage'];

            $desktopMedia = $this->getMediaByPath($desktopMedias, $getAffectedBanners['desktopImage']);
            if ($desktopMedia !== null) {
                $desktopMedia = $this->converter->convertMediaStruct($desktopMedia);
                $getAffectedBanners['desktopMedia'] = $desktopMedia;
            }

            $mobileMedia = $this->getMediaByPath($mobileMedias, $getAffectedBanners['mobileImage']);
            if ($mobileMedia !== null) {
                $mobileMedia = $this->converter->convertMediaStruct($mobileMedia);
                $getAffectedBanners['mobileMedia'] = $mobileMedia;
            }
        }
        if ($limit == 1) {
            $getBanners = $getBanners[0];
        }

        return $getBanners;
    }

    /**
     * @param StoreFrontBundle\Struct\Media[] $media
     * @param string $path
     *
     * @return \Shopware\Bundle\StoreFrontBundle\Struct\Media|null
     */
    private function getMediaByPath(array $media, string $path)
    {
        $mediaService = Shopware()->Container()->get('shopware_media.media_service');
        foreach ($media as $single) {
            if ($mediaService->normalize($single->getFile()) == $path) {
                return $single;
            }
        }

        return null;
    }

    /**
     * @param string[] $images
     *
     * @return int[]
     *@throws Exception
     *
     */
    private function getMediaIdsOfPath(array $images): array
    {
        $query = $this->connection->createQueryBuilder();
        $query->select(['media.id'])
            ->from('s_media', 'media')
            ->where('media.path IN (:path)')
            ->setParameter(':path', $images, Connection::PARAM_STR_ARRAY);

        $statement = $query->execute();

        return $statement->fetchAll(PDO::FETCH_COLUMN);
    }
}
