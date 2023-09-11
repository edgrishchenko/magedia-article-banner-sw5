<?php declare(strict_types=1);

namespace MagediaArticleBanner\Subscriber;

use Enlight\Event\SubscriberInterface;

class ExtendArticleList implements SubscriberInterface
{
    /**
     * @var string
     */
    private $pluginDirectory;

    /**
     * @param $pluginDirectory
     */
    public function __construct($pluginDirectory)
    {
        $this->pluginDirectory = $pluginDirectory;
    }
    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            'Enlight_Controller_Action_PostDispatchSecure_Backend_ArticleList' => 'onArticleListPostDispatch'
        ];
    }

    public function onArticleListPostDispatch(\Enlight_Event_EventArgs $args)
    {
        /** @var \Shopware_Controllers_Backend_Customer $controller */
        $controller = $args->getSubject();

        $view = $controller->View();
        $request = $controller->Request();

        $view->addTemplateDir($this->pluginDirectory . '/Resources/views');

        $view->extendsTemplate('backend/magedia_article_banner/app.js');
        $view->extendsTemplate('backend/magedia_article_banner/view/main/grid.js');
    }
}
