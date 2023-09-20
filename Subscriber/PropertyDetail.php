<?php declare(strict_types=1);

namespace MagediaPropertyBanner\Subscriber;

use Enlight\Event\SubscriberInterface;
use MagediaPropertyBanner\Services\PropertyBannerManager;

class PropertyDetail implements SubscriberInterface
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

            $propertyId = (int) $request->getParam('sProperty');

            $controller->View()->assign('sPropertyBanner', $this->propertyBannerManager->sPropertyBanner($propertyId));
        }

    }
}
