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

        me.control({
            //The save-button from the edit-window
            'window button[action=saveBannerEdit]': {
                click: me.onSaveEditBanner
            },
            //The save-button from the add-window
            'window button[action=addBannerSave]': {
                click: me.onSaveEditBanner
            }
        });

        // me.callParent will execute the init function of the overridden controller
        me.callParent(arguments);
    },

    /**
     * Event listener method which will be fired when the user
     * clicks the "save"-button in the "edit banner"-window.
     *
     * Updates an existing banner in the database (server side).
     *
     * @event click
     * @param [object] btn - pressed Ext.button.Button
     * @return void
     */
    onSaveEditBanner : function(btn) {
        var win     = btn.up('window'),
            form    = win.down('form'),
            formBasis = form.getForm(),
            me      = this,
            store   = me.subApplication.bannerStore,
            record  = form.getRecord();

        form.getForm().updateRecord(record);

        if (formBasis.isValid()) {
            record.save({
                callback: function(self, operation) {
                    var response = Ext.JSON.decode(operation.response.responseText);
                    var data = response.data;

                    Shopware.Msg.createGrowlMessage('', '{s name=saved_success}Banner has been saved.{/s}', '{s name=main_title}{/s}');
                    win.close();
                    store.load({
                        params: { articleId : record.get('articleId') }
                    });
                }
            });
        }
    },
});
