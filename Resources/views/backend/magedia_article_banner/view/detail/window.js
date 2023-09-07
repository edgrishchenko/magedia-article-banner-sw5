//{block name="backend/article/view/detail/window"}
// {$smarty.block.parent}
Ext.define('Shopware.apps.MagediaArticleBanner.view.detail.Window', {
    /**
     * Override the customer detail window
     * @string
     */
    override: 'Shopware.apps.Article.view.detail.Window',

    createMainTabPanel: function() {
        var me = this, result;
        result = me.callParent(arguments);

        me.registerAdditionalTab({
            title: 'Banners',
            tabConfig: { disabled: false },
            contentFn: function (article, stores, eOpts) {
                eOpts.tab.add({
                    tab:
                        me.magediaArticleBannerTab = Ext.create('Ext.container.Container', {
                            region: 'center',
                            padding: 10,
                            title: 'Banners',
                            disabled: false,
                            name: 'additional-tab',
                            //cls: Ext.baseCSSPrefix + 'etsy-tab-container',
                            items: [
                                me.createMagediaArticleBannerTab()
                            ]
                        }),
                    xtype:
                    me.magediaArticleBannerTab,
                    config:
                    me.magediaArticleBannerTab
                });

            },
            scope: me
        });

        return result;
    },

    createMagediaArticleBannerTab: function () {
        var me = this;

        me.etsyFormPanel = Ext.create('Ext.form.Panel', {
            name: 'magedia-article-banner-panel',
            bodyPadding: 10,
            autoScroll: true,
            defaults: {
                labelWidth: 155
            },
            items: [
                me.createTestFieldSet()
            ]
        });

        return me.detailContainer = Ext.create('Ext.container.Container', {
            layout: 'fit',
            name: 'main',
            title: me.snippets.formTab,
            items: [
                me.etsyFormPanel
            ]
        });
    },

    createTestFieldSet: function () {
        //var me = this;

        return Ext.create('Ext.form.FieldSet', {
            layout: 'anchor',
            cls: Ext.baseCSSPrefix + 'article-test-field-set',
            defaults: {
                labelWidth: 155,
                anchor: '100%',
                translatable: true,
                xtype: 'textfield'
            },
            title: 'Test connection content',
            items: [
                {
                    xtype: 'textfield',
                    name: 'blabla',
                    height: 100,
                    fieldLabel: 'blabla'
                },
                {
                    xtype: 'textfield',
                    name: 'columna',
                    height: 100,
                    fieldLabel: 'columna'
                },
                {
                    xtype: 'textfield',
                    name: 'colona',
                    height: 100,
                    fieldLabel: 'colona'
                },
                {
                    xtype: 'textfield',
                    name: 'madeby',
                    height: 100,
                    fieldLabel: 'madeby'
                }
            ]
        });
    }
});
//{/block}
