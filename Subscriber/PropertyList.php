<?php declare(strict_types=1);

namespace MagediaPropertyBanner\Subscriber;

use Enlight\Event\SubscriberInterface;

class PropertyList implements SubscriberInterface
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
    public static function getSubscribedEvents(): array
    {
        return [
            'Enlight_Controller_Action_PostDispatchSecure_Backend_Property' => 'onPropertyPostDispatch'
        ];
    }

    public function onPropertyPostDispatch(\Enlight_Event_EventArgs $args)
    {
        /** @var \Shopware_Controllers_Backend_Customer $controller */
        $controller = $args->getSubject();

        $view = $controller->View();
        $request = $controller->Request();

        $view->addTemplateDir($this->pluginDirectory . '/Resources/views');

        $view->extendsTemplate('backend/magedia_property_banner/app.js');
        $view->extendsTemplate('backend/magedia_property_banner/view/main/option_grid.js');
    }
}
