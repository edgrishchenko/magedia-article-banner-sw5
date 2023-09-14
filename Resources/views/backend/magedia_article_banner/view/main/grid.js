//{block name="backend/article_list/view/main/grid"}
// {$smarty.block.parent}
Ext.define('Shopware.apps.MagediaArticleBanner.view.main.Grid', {
    override: 'Shopware.apps.ArticleList.view.main.Grid',

    initComponent: function () {
        var me = this;

        me.addEvents('createBannerManager');

        me.callParent(arguments);
    },

    getActionColumn: function () {
        var me = this,
            bannerStore = me.subApp.bannerStore;
            parent = me.callParent(arguments);


        parent.width = parent.width + 30;
        parent.items.push({
            getClass: function(value, metadata, record) {
                var iconCls = 'sprite-image--plus'
                if (bannerStore.findRecord('articleId', record.get('Article_id'))) {
                    iconCls = 'sprite-image--pencil';
                }

                return iconCls + ' article-banner-' + record.get('Article_id');
            },
            handler: function (view, rowIndex, colIndex, item, opts, record) {
                me.fireEvent('createBannerManager', record);
            }
        });

        return parent;
    }
});
//{/block}
