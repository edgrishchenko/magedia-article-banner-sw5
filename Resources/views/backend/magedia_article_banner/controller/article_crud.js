

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
            }
        });

        me.callParent(arguments);
    },

    /**
     * @param record
     */
    onCreateBannerManager: function (record) {
        var me = this;

        me.panel = this.subApplication.getView('Shopware.apps.MagediaArticleBanner.view.main.Panel').create({
            bannerStore: me.subApplication.bannerStore
        });

        // Create an show the applications main view.
        me.main = this.subApplication.getView('Shopware.apps.MagediaArticleBanner.view.Main').create({
            items: [ me.panel ]
        }).show();
    },
});
