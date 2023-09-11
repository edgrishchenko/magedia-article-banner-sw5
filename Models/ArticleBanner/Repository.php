<?php declare(strict_types=1);

namespace MagediaArticleBanner\Models\ArticleBanner;

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
     * be used to narrow the selection down to a category id.
     *
     * @param int|null $filter
     *
     * @return Query
     */
    public function getBanners(int $filter = null): Query
    {
        $builder = $this->getBannerMainQuery($filter);

        return $builder->getQuery();
    }

    /**
     * Returns all banners for a given category which are still
     * valid including liveshopping banners.
     * The amount of returned banners can be with the $limit parameter.
     *
     * @param int|null $filter    Category ID
     * @param int $limit     Limit
     * @param bool $randomize
     */
    public function getAllActiveBanners(int $filter = null, int $limit = 0, bool $randomize = false)
    {
        $builder = $this->getBannerMainQuery($filter);
        $today = new DateTime();

        $builder->andWhere('(articleBanner.validFrom <= ?3 OR (articleBanner.validFrom = ?4 OR articleBanner.validFrom IS NULL))')
            ->setParameter(3, $today)
            ->setParameter(4, null);

        $builder->andWhere('(articleBanner.validTo >= ?5 OR (articleBanner.validTo = ?6 OR articleBanner.validTo IS NULL))')
            ->setParameter(5, $today)
            ->setParameter(6, null);

        $ids = $this->getBannerIds($filter, $limit);
        if (!count($ids)) {
            return false;
        }

        $builder->andWhere('articleBanner.id IN (?7)')
            ->setParameter(7, $ids, Connection::PARAM_INT_ARRAY);

        return $builder->getQuery();
    }

    /**
     * Loads all banners without any live shopping banners. The $filter parameter can
     * be used to narrow the selection down to a category id.
     * If the second parameter is set to false only banners which are active will be returned.
     *
     * @param int|null $filter
     *
     * @return QueryBuilder
     */
    public function getBannerMainQuery(int $filter = null): QueryBuilder
    {
        $builder = $this->createQueryBuilder('articleBanner');
        if ($filter !== null || !empty($filter)) {
            // Filter the displayed columns with the passed filter
            $builder->andWhere('articleBanner.articleId = ?1')
                ->setParameter(1, $filter);
        }

        return $builder;
    }

    /**
     * @param int $categoryId
     * @param int $limit
     *
     * @return array
     */
    public function getBannerIds(int $categoryId, int $limit = 0): array
    {
        $builder = $this->createQueryBuilder('articleBanner');
        $today = new DateTime();

        $builder->andWhere('(articleBanner.validFrom <= ?3 OR (articleBanner.validFrom = ?4 OR articleBanner.validFrom IS NULL))')
            ->setParameter(3, $today)
            ->setParameter(4, null);

        $builder->andWhere('(articleBanner.validTo >= ?5 OR (articleBanner.validTo = ?6 OR articleBanner.validTo IS NULL))')
            ->setParameter(5, $today)
            ->setParameter(6, null);

        $builder->select(['articleBanner.id as id'])
            ->andWhere('articleBanner.articleId = ?1')
            ->setParameter(1, $categoryId);
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
