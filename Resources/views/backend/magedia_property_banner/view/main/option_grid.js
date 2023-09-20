//{block name="backend/property/view/main/option_grid"}
// {$smarty.block.parent}
Ext.define('Shopware.apps.MagediaPropertyBanner.view.main.OptionGrid', {
    override: 'Shopware.apps.Property.view.main.OptionGrid',

    initComponent: function () {
        var me = this;

        me.addEvents('createBannerManager');

        me.callParent(arguments);
    },

    getColumns: function () {
        var me = this,
            bannerStore = me.subApp.bannerStore.load(),
            parent = me.callParent(arguments);

        parent[1].width = parent[1].width + 30;
        parent[1].items.push({
            getClass: function(value, metadata, record) {
                var iconCls = 'sprite-image--plus'
                if (bannerStore.findRecord('propertyId', record.get('id'), 0, false, false, true)) {
                    iconCls = 'sprite-image--pencil';
                }

                return iconCls + ' property-banner-' + record.get('id');
            },
            handler: function (view, rowIndex, colIndex, item, opts, record) {
                me.fireEvent('createBannerManager', record);
            }
        });

        return parent;
    }
});
//{/block}
