/**
 * Magedia Property Banner Store - Banner
 *
 * Backend - Defines the banner store
 *
 * This store will be loaded automatically and will just request 30 items at once.
 * It will utilize the Banner Model @see Banner Model
 */
//{block name="backend/magedia_property_banner/store/banner"}
Ext.define('Shopware.apps.MagediaPropertyBanner.store.Banner', {
    extend : 'Ext.data.Store',
    id:'bannerStore',
    autoLoad : false,
    pageSize : 30,
    model : 'Shopware.apps.MagediaPropertyBanner.model.BannerDetail',
    /**
     * Defines the proxies where the data will later be loaded
     * @obj
     */
    proxy : {
        type : 'ajax',
        api : {
            read    : '{url controller="MagediaPropertyBanner" action="getAllBanners"}',
            update  : '{url controller="MagediaPropertyBanner" action="updateBanner"}',
            create  : '{url controller="MagediaPropertyBanner" action="createBanner"}',
            destroy : '{url controller="MagediaPropertyBanner" action="deleteBanner" targetField=banners}'
        },
        // Data will be delivered as json and sits in the field data
        reader : {
            type : 'json',
            root : 'data'
        }
    }
});
//{/block}
