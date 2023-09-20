<?php declare(strict_types=1);

namespace MagediaPropertyBanner\Subscriber;

use Enlight\Event\SubscriberInterface;
use MagediaPropertyBanner\Services\PropertyBannerManager;

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
     * @var PropertyBannerManager
     */
    private $propertyBannerManager;

    /**
     * @param $pluginDirectory
     * @param \Enlight_Template_Manager $templateManager
     * @param PropertyBannerManager $propertyBannerManager
     */
    public function __construct(
        $pluginDirectory,
        \Enlight_Template_Manager $templateManager,
        PropertyBannerManager $propertyBannerManager
    ) {
        $this->pluginDirectory = $pluginDirectory;
        $this->templateManager = $templateManager;
        $this->propertyBannerManager = $propertyBannerManager;
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

            $properties = $controller->View()->getAssign()['sArticle']['sProperties'];

            $propertyBanners = array();

            foreach ($properties as $property) {
                foreach ($property['options'] as $option) {
                    $propertyBanner = $this->propertyBannerManager->sPropertyBanner($option['id']);

                    if ($propertyBanner) {
                        $propertyBanners[] = $propertyBanner;
                    }
                }
            }

            $controller->View()->assign('sPropertyBanners', $propertyBanners);
        }

    }
}
