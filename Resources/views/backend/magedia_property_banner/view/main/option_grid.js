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
            bannerStore = me.subApp.bannerStore,
            parent = me.callParent(arguments);

        parent[1].width = parent[1].width + 30;
        parent[1].items.push({
            getClass: function(value, metadata, record) {

                bannerStore.clearFilter(true);
                bannerStore.load();

                var iconCls = 'sprite-image--plus'
                if (bannerStore.findRecord('property', record.get('id'))) {
                    iconCls = 'sprite-image--pencil';
                }

                return iconCls + ' article-banner-' + record.get('id');
            },
            handler: function (view, rowIndex, colIndex, item, opts, record) {
                me.fireEvent('createBannerManager', record);
            }
        });

        return parent;
    }
});
//{/block}
