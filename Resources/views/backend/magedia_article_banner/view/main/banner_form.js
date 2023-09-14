/*{namespace name=backend/magedia_article_banner/view/main}*/

/**
 * Banner View Main Form
 *
 * View component which features a form panel to edit
 * a existing banner.
 */
//{block name="backend/magedia_article_banner/view/main/banner_form"}
Ext.define('Shopware.apps.MagediaArticleBanner.view.main.BannerForm', {
    extend : 'Enlight.app.Window',
    alias: 'widget.banner-view-main-banner-form',
    cls : 'addWindow',
    autoShow : true,
    border : 0,
    height : 510,
    basePath: '',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    /**
     * Initializes the component
     *
     * @return void
     */
    initComponent: function() {
        var me      = this;
        me.items    = me.createFormPanel();
        me.dockedItems = [{
            xtype: 'toolbar',
            ui: 'shopware-ui',
            dock: 'bottom',
            cls: 'shopware-toolbar',
            items: me.createActionButtons()
        }];


        me.callParent(arguments);
        // Load record
        me.formPanel.getForm().loadRecord(this.record);
    },

    /**
     * Creates the main form panel for this component.
     *
     * @return [object] generated Ext.form.Panel
     */
    createFormPanel: function() {
        var me = this,
            descField, linkField, validFrom, validUntil;

        // Description field
        descField = Ext.create('Ext.form.field.Text', {
            name        : 'description', //
            anchor      : '100%',
            labelWidth: 155,
            allowBlank  : false,
            fieldLabel  : '{s name=form_add/description}Description{/s}',
            supportText : '{s name=form_add/description_support}Description of the banner e.g. Jackets-Winter-Special2013{/s}'
        });

        // Link field
        linkField = Ext.create('Ext.form.field.Text', {
            name        : 'link',
            anchor      : '100%',
            labelWidth: 155,
            fieldLabel  : '{s name=form_add/link}Link{/s}',
            supportText : '{s name=form_add/link_support}Link which will be called up if the banner has been clicked.{/s}',
            emptyText   : 'http://'
        });

        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'value', 'display'],
            data: [
                { value: '_blank', display: '{s name=form_add/link_target/external}External{/s}' },
                { value: '_parent', display: '{s name=form_add/link_target/internal}Shopware{/s}' }
            ]
        });

        me.linkTarget = Ext.create('Ext.form.field.ComboBox', {
            name:'linkTarget',
            labelWidth: 155,
            fieldLabel:'{s name=form_add/link_target/field}Link target{/s}',
            store: store,
            valueField:'value',
            displayField:'display',
            editable:false
        });


        // Get timing containers
        validFrom   = me.createValidFromContainer();
        validUntil  = me.createValidUntilContainer();

        // Desktop Media selection field
        var desktopDropZone = Ext.create('Shopware.MediaManager.MediaSelection', {
            fieldLabel      : '{s name=form_add/desktop_banner}Desktop Banner{/s}',
            labelWidth: 155,
            name            : 'desktop-media-manager-selection',
            supportText     : '{s name=form_add/desktop_banner_support}Desktop Banner image selection via the Media Manager. The selection is limited to one media.{/s}',
            helpText        : '{s name=form_add/desktop_banner_help}Desktop Banner image selection via the Media Manager. The selection is limited to one media.{/s}',
            multiSelect     : false,
            anchor          : '100%'
        });

        // Mobile Media selection field
        var mobileDropZone = Ext.create('Shopware.MediaManager.MediaSelection', {
            fieldLabel      : '{s name=form_add/mobile_banner}Mobile Banner{/s}',
            labelWidth: 155,
            name            : 'mobile-media-manager-selection',
            supportText     : '{s name=form_add/mobile_banner_support}Mobile Banner image selection via the Media Manager. The selection is limited to one media.{/s}',
            helpText        : '{s name=form_add/mobile_banner_help}Mobile Banner image selection via the Media Manager. The selection is limited to one media.{/s}',
            multiSelect     : false,
            anchor          : '100%'
        });

        // Actual form panel
        me.formPanel = Ext.create('Ext.form.Panel', {
            border      : false,
            layout: 'anchor',
            bodyPadding : 10,
            flex: 1,
            autoScroll: true,
            defaults: { anchor: '100%' },
            items       : [ descField, linkField, me.linkTarget, validFrom, validUntil, desktopDropZone, mobileDropZone ]
        });

        return me.formPanel;
    },

    /**
     * Creates a container which includes the "valid from" field
     *
     * @return [object] generated Ext.container.Container
     */
    createValidFromContainer: function() {
        var me = this;

        me.validFromField = Ext.create('Ext.form.field.Date', {
                submitFormat: 'd.m.Y',
                fieldLabel  : '{s name=form_add/from_label}Active from{/s}',
                name        : 'validFromDate',
                supportText : '{s name=form_add/from_support}Format: dd.mm.jjjj{/s}',
                columnWidth : .6,
                labelWidth: 155,
                minValue    : new Date(),
                value       : new Date(),
                allowBlank  : true,
                listeners: {
                    change: function(field, newValue) {
                        me.validToField.setMinValue(newValue);
                    }
                }
            }
        );

        return Ext.create('Ext.container.Container', {
            layout      : 'column',
            anchor      : '100%',
            items   : [
                ,me.validFromField,
                {
                    margin      : '0 0 0 10',
                    submitFormat: 'H:i',
                    xtype       : 'timefield',
                    name        : 'validFromTime',
                    supportText : '{s name=form_add/from_time_support}Format: hh:mm{/s}',
                    columnWidth : .4,
                    minDate     : new Date()
                }]
        })
    },

    /**
     * Creates a container which includes the "valid until" field
     *
     * @return [object] generated Ext.container.Container
     */
    createValidUntilContainer: function() {
        var me = this;

        me.validToField = Ext.create('Ext.form.field.Date', {
            submitFormat: 'd.m.Y',
            fieldLabel  : '{s name=form_add/to_date_label}Active till{/s}',
            name        : 'validToDate',
            supportText : '{s name=form_add/to_date_support}Format jjjj.mm.tt{/s}',
            columnWidth : .60,
            labelWidth: 155,
            allowBlank  : true,
            listeners: {
                change: function(field, newValue) {
                    me.validFromField.setMaxValue(newValue);
                }
            }
        });

        return Ext.create('Ext.container.Container', {
            layout      : 'column',
            anchor      : '100%',
            items       : [
                me.validToField,
                {
                    margin      : '0 0 0 10',
                    xtype       : 'timefield',
                    name        : 'validToTime',
                    submitFormat: 'H:i',
                    supportText : '{s name=form_add/to_time_support}Format: hh:mm{/s}',
                    columnWidth : .40
                }]
        })
    },

    /**
     * Creates the action buttons for the component.
     *
     * @return [array] - Array of Ext.button.Button's
     */
    createActionButtons: function() {
        var me = this;

        return ['->', {
            text    : '{s name=form_add/cancel}Cancel{/s}',
            scope   : me,
            handler : me.destroy
        }, {
            text    : '{s name=form_add/save}Save{/s}',
            action  : 'saveBannerEdit',
            cls: 'primary'
        }];
    }
});
//{/block}
