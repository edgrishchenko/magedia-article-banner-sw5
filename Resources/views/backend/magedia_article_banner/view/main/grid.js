//{block name="backend/article_list/view/main/grid"}
// {$smarty.block.parent}
Ext.define('Shopware.apps.MagediaArticleBanner.view.main.Grid', {
    override: 'Shopware.apps.ArticleList.view.main.Grid',

    getActionColumn: function () {
        var me = this,
            parent = me.callParent(arguments);


        parent.width = parent.width + 30;
        parent.items.push({
            action: 'addArticleBanner',
            cls: 'editBtn',
            iconCls: 'sprite-image--plus',
        });

        return parent;
    }
});
//{/block}
