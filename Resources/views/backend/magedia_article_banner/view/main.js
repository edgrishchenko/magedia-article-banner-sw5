/*{namespace name=backend/magedia_article_banner/view/main}*/

/**
 * Banner View Main Panel
 *
 * View component which features the main panel
 * of the module. It displays the banners.
 */
//{block name="backend/magedia_article_banner/view/main"}
Ext.define('Shopware.apps.MagediaArticleBanner.view.Main', {
    extend: 'Enlight.app.Window',
    layout: 'fit',
    alias: 'widget.bannermanager',
    width: 1000,
    height: '90%',
    maximizable: true,
    stateful: true,
    stateId: 'BannerManager',
    border: 0,
    title: '{s name=main_title}Banner Management{/s}'
});
//{/block}
