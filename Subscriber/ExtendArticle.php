<?php declare(strict_types=1);

namespace MagediaArticleBanner\Subscriber;

use Enlight\Event\SubscriberInterface;

class ExtendArticle implements SubscriberInterface
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
            'Enlight_Controller_Action_PostDispatchSecure_Backend_Article' => 'onArticlePostDispatch'
        ];
    }

    public function onArticlePostDispatch(\Enlight_Event_EventArgs $args)
    {
        /** @var \Shopware_Controllers_Backend_Customer $controller */
        $controller = $args->getSubject();

        $view = $controller->View();

        $view->addTemplateDir($this->pluginDirectory . '/Resources/views');

        $view->extendsTemplate('backend/magedia_article_banner/app.js');
        $view->extendsTemplate('backend/magedia_article_banner/view/detail/window.js');
    }
}
