

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
                createBannerManager: me.onCreateBannerManager,
            },
        });

        me.callParent(arguments);
    },

    /**
     * @param record
     */
    onCreateBannerManager: function (record) {
        var me = this,
            bannerStore = me.subApplication.bannerStore,
            articleId  = record.get('Article_id');

        // remove the old filter and set a new one
        bannerStore.clearFilter(true);
        bannerStore.filter("articleId", articleId);
        bannerStore.load({
            params: { articleId: articleId }
        });

        me.panel = this.subApplication.getView('Shopware.apps.MagediaArticleBanner.view.main.Panel').create({
            bannerStore: bannerStore,
            record: record
        });

        // Create an show the applications main view.
        me.main = this.subApplication.getView('Shopware.apps.MagediaArticleBanner.view.Main').create({
            items: [ me.panel ]
        }).show();
    },
});
