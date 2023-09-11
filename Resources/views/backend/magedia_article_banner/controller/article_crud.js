

Ext.define('Shopware.apps.MagediaArticleBanner.controller.ArticleCrud', {

    /**
     * Override the customer main controller
     * @string
     */
    override: 'Shopware.apps.ArticleList.controller.ArticleCrud',

    init: function () {
        var me = this;

        me.control({
            'multi-edit-main-grid': {
                addBanner: me.onAddBanner,
            }
        });

        me.callParent(arguments);
    },

    /**
     * @param record
     */
    onAddBanner: function (record) {
        var me = this,
            bannerStore = me.subApplication.bannerStore,
            articleId = record.data.id,
            model = Ext.create('Shopware.apps.MagediaArticleBanner.model.BannerDetail'),
            currentArticle = record.data

        me.getView('Shopware.apps.MagediaArticleBanner.view.main.BannerFormAdd').create({
            bannerStore: bannerStore,
            record: model,
            articleId: articleId,
            article: currentArticle
        });
    },
});
