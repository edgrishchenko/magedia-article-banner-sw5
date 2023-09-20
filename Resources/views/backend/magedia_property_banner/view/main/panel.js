/*{namespace name=backend/magedia_property_banner/view/main}*/

/**
 *  Banner View Main Panel
 *
 * View component which features the main panel
 * of the module. It displays the banners.
 */
//{block name="backend/magedia_property_banner/view/main/panel"}
Ext.define('Shopware.apps.MagediaPropertyBanner.view.main.Panel', {
    extend: 'Ext.container.Container',
    alias : 'widget.banner-view-main-panel',
    layout: 'border',
    style: 'background: #fff',

    /**
     * Initialize the view.main.List and defines the necessary
     * default configuration
     * @return void
     */
    initComponent : function () {
        var me = this;

        me.bannerList = me.getBannerList();
        me.toolbar = me.getBannerToolbar();
        me.items = [ me.bannerList, me.toolbar ];

        me.addEvents('addBanner', 'editBanner');

        me.callParent(arguments);
    },
    /**
     * Returns the toolbar used to add or delete a banner
     *
     * @return Ext.toolbar.Toolbar
     */
    getBannerToolbar : function() {
        var me = this;

        return Ext.create('Ext.toolbar.Toolbar', {
            region: 'north',
            ui: 'shopware-ui',
            items: [
                /*{if {acl_is_allowed privilege=create}}*/
                {
                    iconCls : 'sprite-plus-circle',
                    text : '{s name=view/main_add}Add{/s}',
                    action : 'addBanner',
                    handler: function() {
                        me.fireEvent('addBanner', me.record);
                    }
                },
                /* {/if} */
                /*{if {acl_is_allowed privilege=delete}}*/
                {
                    iconCls : 'sprite-minus-circle',
                    text : '{s name=view/main_delete}Delete{/s}',
                    disabled : true,
                    action : 'deleteBanner'
                },
                /* {/if} */
                /*{if {acl_is_allowed privilege=update}}*/
                {
                    iconCls : 'sprite-pencil',
                    text : '{s name=view/main_edit}Edit{/s}',
                    disabled : true,
                    action : 'editBanner',
                    handler: function() {
                        me.fireEvent('editBanner', me.record);
                    }
                }
                /*{/if}*/
            ]
        });
    },
    /**
     * The Banner data view
     *
     * @return Ext.Panel
     */
    getBannerList : function() {
        var me = this;

        me.dataView = Ext.create('Ext.view.View', {
            store: me.bannerStore,
            region: 'center',
            tpl: me.getBannerListTemplate(),
            multiSelect: true,
            height: '100%',//just for the selector plugin
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: '',
            plugins: [ Ext.create('Ext.ux.DataView.DragSelector') ],

            /**
             * Data preparation for the data view
             *
             * @param data
             */
            prepareData : function(data) {
                Ext.apply(data, {
                    desktop_img         : data.desktopImage,
                    mobile_img         : data.mobileImage,
                    id           : data.id
                });
                return data;
            }
        });

        return Ext.create('Ext.panel.Panel', {
            cls: 'banner-images-view',//only for the css styling
            region: 'center',
            unstyled: true,
            style: 'border-top: 1px solid #c7c7c7',
            autoScroll: true,
            items: [ me.dataView ]
        });
    },
    /**
     * Returns the ExtJS Template for the banner display
     *
     * @return array of strings
     */
    getBannerListTemplate : function() {
        var basePath = '';
        return [
            '<tpl for=".">',
            '<div class="thumb-wrap" id="{literal}{id}{/literal}" style="width: 440px">',
            '<div class="thumb" style="width: 430px; height: 150px; margin: 0 3px 4px;">',
            '<img src="{literal}{desktopImage}{/literal}" title="{literal}{description}{/literal}" style="width: 205px; height: 140px; float: left">',
            '<img src="{literal}{mobileImage}{/literal}" title="{literal}{description}{/literal}" style="width: 205px; height: 140px; float: right">',
            '</div>',
            '<span class="x-editable">{literal}{description}{/literal}</span>',
            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        ];
    },
});
//{/block}
