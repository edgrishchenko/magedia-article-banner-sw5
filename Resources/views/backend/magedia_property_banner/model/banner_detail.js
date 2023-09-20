/**
 * Magedia Property Banner Model - Banner
 *
 * Backend - Management for Banner. Create | Modify | Delete.
 * Standard banner model
 */
//{block name="backend/magedia_property_banner/model/banner"}
Ext.define('Shopware.apps.MagediaPropertyBanner.model.BannerDetail', {
    /**
     * Extends the default extjs 4 model
     * @string
     */
    extend : 'Ext.data.Model',
    /**
     * Set an alias to make the handling a bit easier
     * @string
     */
    alias : 'model.bannermodel',
    /**
     * Defined items used by that model
     *
     * We have to have a splitted date time object here.
     * One part is used as date and the other part is used as time - this is because
     * the form has two separate fields - one for the date and one for the time.
     *
     * @array
     */
    fields : [
        //{block name="backend/banner/model/banner/fields"}{/block}
        { name : 'id',              type: 'int' },
        { name : 'title',              type: 'string' },
        { name : 'description',     type: 'string' },
        { name : 'validFromDate', type: 'date', dateFormat: 'd.m.Y' },
        { name : 'validFromTime', type: 'date', dateFormat: 'H:i' },
        { name : 'validToDate',   type: 'date', dateFormat: 'd.m.Y' },
        { name : 'validToTime',   type: 'date', dateFormat: 'H:i' },
        { name : 'link',            type: 'string' },
        { name : 'desktopImage',             type: 'string' },
        { name : 'desktop-media-manager-selection', type: 'string' },
        { name : 'mobileImage',             type: 'string' },
        { name : 'mobile-media-manager-selection', type: 'string' },
        { name : 'linkTarget',     type: 'string' },
        { name : 'propertyId',      type: 'int' },
        { name : 'desktopExtension',       type: 'string' },
        { name : 'mobileExtension',       type: 'string' }
    ],

    /**
     * defines the field for the unique identifier - id is default.
     *
     * @int
     */
    idProperty : 'id',
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
