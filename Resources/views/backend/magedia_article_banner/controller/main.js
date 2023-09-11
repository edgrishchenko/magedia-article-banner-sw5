// This is the controller


Ext.define('Shopware.apps.MagediaArticleBanner.controller.Main', {
    /**
     * Override the customer main controller
     * @string
     */
    override: 'Shopware.apps.ArticleList.controller.Main',


    init: function () {
        var me = this;

        me.subApplication.bannerStore = me.subApplication.getStore('Shopware.apps.MagediaArticleBanner.store.Banner');


        // me.callParent will execute the init function of the overridden controller
        me.callParent(arguments);
    },
});
