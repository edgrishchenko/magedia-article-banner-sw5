

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
    onAddBanner: function(record) {
        console.log(record);
    },
});
