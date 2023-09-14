/**
 * Magedia Article Banner Store - Banner
 *
 * Backend - Defines the banner store
 *
 * This store will be loaded automatically and will just request 30 items at once.
 * It will utilize the Banner Model @see Banner Model
 */
//{block name="backend/magedia_article_banner/store/banner"}
Ext.define('Shopware.apps.MagediaArticleBanner.store.Banner', {
    extend : 'Ext.data.Store',
    id:'bannerStore',
    autoLoad : false,
    pageSize : 30,
    model : 'Shopware.apps.MagediaArticleBanner.model.BannerDetail',
    /**
     * Defines the proxies where the data will later be loaded
     * @obj
     */
    proxy : {
        type : 'ajax',
        api : {
            read    : '{url controller="MagediaArticleBanner" action="getAllBanners"}',
            update  : '{url controller="MagediaArticleBanner" action="updateBanner"}',
            create  : '{url controller="MagediaArticleBanner" action="createBanner"}',
            destroy : '{url controller="MagediaArticleBanner" action="deleteBanner" targetField=banners}'
        },
        // Data will be delivered as json and sits in the field data
        reader : {
            type : 'json',
            root : 'data'
        }
    }
});
//{/block}
