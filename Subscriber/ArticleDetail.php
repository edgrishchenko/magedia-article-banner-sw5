<?php declare(strict_types=1);

namespace MagediaArticleBanner\Subscriber;

use Enlight\Event\SubscriberInterface;
use MagediaArticleBanner\Services\ArticleBannerManager;

class ArticleDetail implements SubscriberInterface
{
    /**
     * @var string
     */
    private $pluginDirectory;

    /**
     * @var \Enlight_Template_Manager
     */
    private $templateManager;

    /**
     * @var ArticleBannerManager
     */
    private $articleBannerManager;

    /**
     * @param $pluginDirectory
     * @param \Enlight_Template_Manager $templateManager
     * @param ArticleBannerManager $articleBannerManager
     */
    public function __construct(
        $pluginDirectory,
        \Enlight_Template_Manager $templateManager,
        ArticleBannerManager $articleBannerManager
    ) {
        $this->pluginDirectory = $pluginDirectory;
        $this->templateManager = $templateManager;
        $this->articleBannerManager = $articleBannerManager;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'Enlight_Controller_Action_PostDispatchSecure_Frontend' => 'onPreDispatch',
        ];
    }

    public function onPreDispatch(\Enlight_Event_EventArgs $args)
    {
        $controller = $args->getSubject();
        $request = $controller->Request();

        if ($request->getControllerName() === 'detail') {
            $this->templateManager->addTemplateDir($this->pluginDirectory . '/Resources/views');

            $articleId = (int) $request->getParam('sArticle');

            $controller->View()->assign('sArticleBanner', $this->articleBannerManager->sArticleBanner($articleId));
        }

    }
}
