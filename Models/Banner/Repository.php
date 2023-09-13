<?php declare(strict_types=1);

namespace MagediaArticleBanner\Models\Banner;

use DateTime;
use Doctrine\DBAL\Connection;
use Doctrine\ORM\Query;
use Shopware\Components\Model\ModelRepository;
use Shopware\Components\Model\QueryBuilder;

/**
 * Repository for the banner model (Shopware\Models\Banner\Banner).
 * <br>
 * The banner model repository is responsible to load all banner data.
 */
class Repository extends ModelRepository
{
    /**
     * Loads all banners. The $filter parameter can
     * be used to narrow the selection down to an article id.
     *
     * @param string|null $filter
     *
     * @return Query
     */
    public function getBanners(?string $filter = null): Query
    {
        $builder = $this->getBannerMainQuery($filter);

        return $builder->getQuery();
    }

    /**
     * Returns all banners for a given article which are still
     * valid including liveshopping banners.
     * The amount of returned banners can be with the $limit parameter.
     *
     * @param string|null $filter    Article ID
     * @param int $limit     Limit
     * @param bool $randomize
     */
    public function getAllActiveBanners(?string $filter = null, int $limit = 0, bool $randomize = false)
    {
        $builder = $this->getBannerMainQuery($filter);
        $today = new DateTime();

        $builder->andWhere('(banner.validFrom <= ?3 OR (banner.validFrom = ?4 OR banner.validFrom IS NULL))')
            ->setParameter(3, $today)
            ->setParameter(4, null);

        $builder->andWhere('(banner.validTo >= ?5 OR (banner.validTo = ?6 OR banner.validTo IS NULL))')
            ->setParameter(5, $today)
            ->setParameter(6, null);

        $ids = $this->getBannerIds($filter, $limit);
        if (!count($ids)) {
            return false;
        }

        $builder->andWhere('banner.id IN (?7)')
            ->setParameter(7, $ids, Connection::PARAM_INT_ARRAY);

        return $builder->getQuery();
    }

    /**
     * Loads all banners without any live shopping banners. The $filter parameter can
     * be used to narrow the selection down to an article id.
     * If the second parameter is set to false only banners which are active will be returned.
     *
     * @param string|null $filter
     *
     * @return QueryBuilder
     */
    public function getBannerMainQuery(?string $filter = null): QueryBuilder
    {
        $builder = $this->createQueryBuilder('banner');
        if ($filter !== null || !empty($filter)) {
            // Filter the displayed columns with the passed filter
            $builder->andWhere('banner.articleId = ?1')
                ->setParameter(1, $filter);
        }

        return $builder;
    }

    /**
     * @param string $articleId
     * @param int $limit
     *
     * @return array
     */
    public function getBannerIds(string $articleId, int $limit = 0): array
    {
        $builder = $this->createQueryBuilder('banner');
        $today = new DateTime();

        $builder->andWhere('(banner.validFrom <= ?3 OR (banner.validFrom = ?4 OR banner.validFrom IS NULL))')
            ->setParameter(3, $today)
            ->setParameter(4, null);

        $builder->andWhere('(banner.validTo >= ?5 OR (banner.validTo = ?6 OR banner.validTo IS NULL))')
            ->setParameter(5, $today)
            ->setParameter(6, null);

        $builder->select(['banner.id as id'])
            ->andWhere('banner.articleId = ?1')
            ->setParameter(1, $articleId);
        $retval = [];
        $data = $builder->getQuery()->getArrayResult();
        foreach ($data as $id) {
            $retval[] = $id['id'];
        }
        shuffle($retval);

        if ($limit > 0) {
            $retval = array_slice($retval, 0, $limit);
        }

        return $retval;
    }
}
