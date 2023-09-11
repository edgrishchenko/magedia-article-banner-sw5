//{block name="backend/article_list/view/main/grid"}
// {$smarty.block.parent}
Ext.define('Shopware.apps.MagediaArticleBanner.view.main.Grid', {
    override: 'Shopware.apps.ArticleList.view.main.Grid',

    initComponent: function () {
        var me = this;

        me.addEvents('addBanner');

        me.callParent(arguments);
    },

    getActionColumn: function () {
        var me = this,
            parent = me.callParent(arguments);


        parent.width = parent.width + 30;
        parent.items.push({
            cls: 'editBtn',
            iconCls: 'sprite-image--plus',
            handler: function (view, rowIndex, colIndex, item, opts, record) {
                me.fireEvent('addBanner', record);
            }
        });

        return parent;
    }
});
//{/block}
