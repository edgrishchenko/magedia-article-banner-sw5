

Ext.define('Shopware.apps.MagediaArticleBanner.view.main.Panel', {
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

        me.callParent(arguments);
    },
    /**
     * Returns the toolbar used to add or delete a banner
     *
     * @return Ext.toolbar.Toolbar
     */
    getBannerToolbar : function() {
        return Ext.create('Ext.toolbar.Toolbar', {
            region: 'north',
            ui: 'shopware-ui',
            items: [
                /*{if {acl_is_allowed privilege=create}}*/
                {
                    iconCls : 'sprite-plus-circle',
                    text : '{s name=view/main_add}Add{/s}',
                    action : 'addBanner',
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
                    action : 'editBanner'
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
             * eg. truncate the description to max 27 chars
             *
             * @param data
             */
            prepareData : function(data) {
                Ext.apply(data, {
                    description : Ext.util.Format.ellipsis(data.description, 27),
                    img         : data.image,
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
            '<div class="thumb-wrap" id="{literal}{id}{/literal}">',
            '<div class="thumb"><img src="{literal}{image}{/literal}" title="{literal}{description}{/literal}"></div>',
            '<span class="x-editable">{literal}{description}{/literal}</span>',
            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        ];
    },
});
