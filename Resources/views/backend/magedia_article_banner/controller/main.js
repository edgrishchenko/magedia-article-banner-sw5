/*{namespace name=backend/banner/controller/main}*/
//{block name="backend/magedia_article_banner/controller/main"}
Ext.define('Shopware.apps.MagediaArticleBanner.controller.Main', {
    extend: 'Ext.app.Controller',
    refs: [
        { ref:'addArticleBannerButton', selector:'button[action=addArticleBanner]' },
    ],

    /**
     * keeps the message that will be shown if some banners should be deleted
     * @private
     * @string
     */
    deleteDialogMessage: '{s name=delete_dialog_message}There have been [0] banners selected for deletion. Are you sure you want to delete those banners?{/s}',
    /**
     * Holder property for the main panel
     *
     * @private
     * @null
     */
    panel: null,

    /**
     * Creates the necessary event listener for this
     * specific controller and opens a new Ext.window.Window
     * to display the sub-application.
     */
    init: function () {
        var me = this;

        // Set necessary event listeners
        me.control({
            'button[action=addArticleBanner]':{
                click: me.onAddArticleBanner
            }
        });
        // create and save the new view so we can access that view easily later

        me.subApplication.articleBannerStore = me.subApplication.getStore('ArticleBanner');

        Ext.suspendLayouts();
        me.panel = this.subApplication.getView('main.Panel').create({
            articleBannerStore: me.subApplication.articleBannerStore
        });

        // Create an show the applications main view.
        me.main = this.subApplication.getView('Main').create({
            items: [ me.panel ]
        }).show();
        Ext.resumeLayouts(true);
    },

    /**
     * Event listener method which will be fired when the user
     * clicks the "add"-button in the "main"-window.
     *
     * Shows the add-new Banner window
     *
     * @event click
     * @param [object] btn - pressed Ext.button.Button
     * @return void
     */
    onAddArticleBanner : function() {
        var me              = this,
            articleBannerStore     = me.subApplication.articleBannerStore,
            model = Ext.create('Shopware.apps.MagediaArticleBanner.model.ArticleBannerDetail');

        me.getView('main.ArticleBannerFormAdd').create({
            articleBannerStore: articleBannerStore,
            record: model
        });
    },
});
//{/block}
