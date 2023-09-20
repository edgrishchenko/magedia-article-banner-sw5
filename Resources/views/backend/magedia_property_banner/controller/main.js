/**
 *
 */
//{namespace name=backend/magedia_property_banner/main}
//{block name="backend/magedia_property_banner/controller/main"}
Ext.define('Shopware.apps.MagediaPropertyBanner.controller.Main', {
    /**
     * Override the property main controller
     * @string
     */
    override: 'Shopware.apps.Property.controller.Main',

    /**
     * keeps the message that will be shown if some banners should be deleted
     * @private
     * @string
     */
    deleteDialogMessage: '{s name=delete_dialog_message}There have been [0] banners selected for deletion. Are you sure you want to delete those banners?{/s}',

    init: function () {
        var me = this;

        me.addRef({ ref:'editBannerButton', selector:'banner-view-main-panel button[action=editBanner]' });
        me.addRef({ ref:'deleteBannerButton', selector:'banner-view-main-panel button[action=deleteBanner]' });
        me.addRef({ ref:'mainPanel', selector:'bannermanager banner-view-main-panel' });

        me.subApplication.bannerStore = me.subApplication.getStore('Shopware.apps.MagediaPropertyBanner.store.Banner');

        me.control({
            'property-main-optionGrid':{
                createBannerManager: me.onCreateBannerManager,
            },
            'banner-view-main-panel panel dataview':{
                /*{if {acl_is_allowed privilege=update}}*/
                itemdblclick: me.onBannerClick,
                /* {/if} */
                selectionchange: me.onBannerSelection
            },
            'banner-view-main-panel':{
                addBanner: me.onAddBanner,
                editBanner: me.onEditBanner
            },
            'banner-view-main-panel button[action=deleteBanner]':{
                click: me.onDeleteBanner
            },
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
     * @param record
     */
    onCreateBannerManager: function (record) {
        var me = this,
            bannerStore = me.subApplication.bannerStore,
            propertyId  = record.get('id');

        // remove the old filter and set a new one
        bannerStore.clearFilter(true);
        bannerStore.filter("propertyId", propertyId);
        bannerStore.load({
            params: { propertyId: propertyId }
        });

        me.panel = this.subApplication.getView('Shopware.apps.MagediaPropertyBanner.view.main.Panel').create({
            bannerStore: bannerStore,
            record: record
        });

        // Create an show the applications main view.
        me.main = this.subApplication.getView('Shopware.apps.MagediaPropertyBanner.view.Main').create({
            items: [ me.panel ]
        }).show();
    },

    /**
     * @param record
     */
    onAddBanner : function(record) {
        var me = this,
            bannerStore = me.subApplication.bannerStore,
            propertyId = record.get('id'),
            model = Ext.create('Shopware.apps.MagediaPropertyBanner.model.BannerDetail'),
            currentProperty = record.data

        me.getView('Shopware.apps.MagediaPropertyBanner.view.main.BannerFormAdd').create({
            bannerStore: bannerStore,
            record: model,
            propertyId: propertyId,
            property: currentProperty
        });
    },

    /**
     * Edit method called through the edit button
     *
     * @event click
     */
    onEditBanner : function(record) {
        var me = this,
            bannerStore = me.subApplication.bannerStore,
            dataView        = me.getMainPanel().dataView,
            selection       = dataView.getSelectionModel().getLastSelected(),
            propertyId      = selection.get('propertyId')

        me.getView('Shopware.apps.MagediaPropertyBanner.view.main.BannerForm').create({
            bannerStore : bannerStore,
            record      : selection,
            scope       : me,
            propertyId   : propertyId,
            title       : record.get('value')
        });
    },

    /**
     * Event listener method which will be fired when the user clicks
     * on the "delete marked banner(s)"-button.
     *
     * Deletes one or multiple banners using a bulk data operation.
     *
     * @event click
     * @return void
     */
    onDeleteBanner : function() {
        var me              = this,
            dataView        = me.getMainPanel().dataView,
            selection       = dataView.getSelectionModel().getSelection(),
            store           = me.subApplication.bannerStore,
            noOfElements    = selection.length;

        Ext.MessageBox.confirm('{s name=delete_dialog_title}Delete selected banners.{/s}',
            Ext.String.format(this.deleteDialogMessage, noOfElements),
            function (response) {
                if ('yes' !== response) {
                    return false;
                }
                if (selection.length > 0) {
                    store.remove(selection);
                    try {
                        Shopware.Msg.createGrowlMessage('', '{s name=delete_success}Banner has been deleted.{/s}', '{s name=main_title}{/s}');
                        store.save();
                        store.load();

                        var propertyId = selection[0].get('propertyId');
                        var bannerManagerButton = Ext.select('.property-banner-' + propertyId);

                        if (store.getCount() === 0) {
                            bannerManagerButton.removeCls('sprite-image--pencil');
                            bannerManagerButton.addCls('sprite-image--plus');
                        }
                    } catch (e) {
                        Shopware.Msg.createGrowlMessage('', '{s name=delete_error}Not every banner could be deleted:{/s} ' + e.message, '{s name=main_title}{/s}');
                    }
                }
            });
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
                        params: { propertyId : record.get('propertyId') }
                    });

                    var propertyId = record.get('propertyId');
                    var bannerManagerButton = Ext.select('.property-banner-' + propertyId);

                    if (store.getCount() === 0) {
                        bannerManagerButton.removeCls('sprite-image--plus');
                        bannerManagerButton.addCls('sprite-image--pencil');
                    }
                }
            });
        }
    },

    /**
     * Event listener method which will be fired when the user double
     * clicks an existing banner.
     *
     * Opens the "edit banner" window and passes the associated banner record
     *
     * @event dblclick
     * @param [object] node - HTML DOM node of the clicked banner
     * @param [object] record - Associated Ext.data.Model
     * @return void
     */
    onBannerClick : function(node, record) {
        var me              = this,
            bannerStore     = me.subApplication.bannerStore,
            propertyId      = record.get('propertyId');

        me.getView('Shopware.apps.MagediaPropertyBanner.view.main.BannerForm').create({
            bannerStore : bannerStore,
            record      : record,
            scope       : me,
            propertyId   : propertyId,
            title       : record.get('Property_name')
        });
    },

    /**
     * Event listener method which will be fired when the user
     * selects one or more banner.
     *
     * Locks/Unlocks the "delete marked banner(s)"-button
     *
     * @event selectionchange
     * @param [object] view - Ext.view.View
     * @param [array] selection - Array of Ext.data.Model's from the selected banners
     * @return void
     */
    onBannerSelection: function(view, selection) {
        var me          = this,
            deleteBtn   = me.getDeleteBannerButton(),
            editButton = me.getEditBannerButton();
        /*{if {acl_is_allowed privilege=delete}}*/
        deleteBtn.setDisabled((selection.length > 0) ? false : true);
        /* {/if} */
        /*{if {acl_is_allowed privilege=update}}*/
        // rule on when the edit button should be enabled.
        editButton.setDisabled((selection.length == 1) ? false : true);
        /* {/if} */

    }
});
//{/block}
