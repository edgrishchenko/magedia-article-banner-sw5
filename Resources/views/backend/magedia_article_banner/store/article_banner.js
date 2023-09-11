/**
 * Shopware Store - Banner
 *
 * Backend - Defines the banner store
 *
 * This store will be loaded automatically and will just request 30 itemFs at once.
 * It will utilize the Banner Model @see Banner Model
 */
//{block name="backend/magedia_article_banner/store/article_banner"}
Ext.define('Shopware.apps.MagediaArticleBanner.store.ArticleBanner', {
    extend : 'Ext.data.Store',
    id:'articleBannerStore',
    autoLoad : false,
    pageSize : 30,
    model : 'Shopware.apps.Banner.model.BannerDetail',
    /**
     * Defines the proxies where the data will later be loaded
     * @obj
     */
    proxy : {
        type : 'ajax',
        api : {
            read    : '{url controller="banner" action="getAllBanners"}',
            update  : '{url controller="banner" action="updateBanner"}',
            create  : '{url controller="banner" action="createBanner"}',
            destroy : '{url controller="banner" action="deleteBanner" targetField=banners}'
        },
        // Data will be delivered as json and sits in the field data
        reader : {
            type : 'json',
            root : 'data'
        }
    }
});
//{/block}
