<?php declare(strict_types=1);

namespace MagediaPropertyBanner\Models\Banner;

use DateTime;
use DateTimeInterface;
use Exception;
use Doctrine\ORM\Mapping as ORM;
use Shopware\Components\Model\ModelEntity;

/**
 * Banner Model
 * <br>
 * This Model represented a banner which can be displayed on top of a given property.
 * A banner can be shown based on a given time window. To set this window you have to
 * set the following fields
 * - validFrom as datetime
 * - validTo   as datetime
 *
 * Each banner may link to an other website or to an internal page. If the link starts
 * with http:// or https:// it will be assumed that the link is an external one otherwise
 * an internal link will be generated.
 *
 * Relations and Associations
 * <code>
 * - Property    =>  Shopware\Models\Property\Property     [1:n] [s_propertys]
 * </code>
 *
 * Indices for magedia_property_banners:
 * <code>
 *   - PRIMARY KEY (`id`)
 * </code>
 *
 * @ORM\Table(name="magedia_property_banners")
 * @ORM\Entity(repositoryClass="Repository")
 * @ORM\HasLifecycleCallbacks()
 */
class Banner extends ModelEntity
{
    /**
     * Primary Key - autoincrement value
     *
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * Title for that banner
     *
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=250, nullable=false)
     */
    private $title;

    /**
     * Description for that banner. This description will be used as alt and title attribute
     *
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=250, nullable=false)
     */
    private $description;

    /**
     * Defines the date and time when this banner should be displayed
     *
     * @var DateTimeInterface
     *
     * @ORM\Column(name="valid_from", type="datetime", nullable=true)
     */
    private $validFrom;

    /**
     * Defines the date and time when this banner should not more displayed
     *
     * @var DateTimeInterface
     *
     * @ORM\Column(name="valid_to", type="datetime", nullable=true)
     */
    private $validTo;

    /**
     * Relative path to the real banner desktop image.
     *
     * @var string
     *
     * @ORM\Column(name="desktop_img", type="string", length=100, nullable=false)
     */
    private $desktopImage;

    /**
     * Relative path to the real banner mobile image.
     *
     * @var string
     *
     * @ORM\Column(name="mobile_img", type="string", length=100, nullable=false)
     */
    private $mobileImage;

    /**
     * An optional link which will be fired when the banner is been clicked.
     *
     * @var string
     *
     * @ORM\Column(name="link", type="string", length=255, nullable=false)
     */
    private $link;

    /**
     * Determines if the click at the banner should be opened in a new browser
     * window or if the current window is used.
     *
     * @var string
     *
     * @ORM\Column(name="link_target", type="string", length=255, nullable=false)
     */
    private $linkTarget;

    /**
     * The id of the property for which this banner is for.
     *
     * @var int
     *
     * @ORM\Column(name="propertyID", type="integer", nullable=false)
     */
    private $propertyId;

    /**
     * The extension of the banner desktop image file will be stored here
     *
     * @var string
     *
     * @ORM\Column(name="desktop_extension", type="string", length=25, nullable=false)
     */
    private $desktopExtension;

    /**
     * The extension of the banner mobile image file will be stored here
     *
     * @var string
     *
     * @ORM\Column(name="mobile_extension", type="string", length=25, nullable=false)
     */
    private $mobileExtension;

    /**
     * Returns the numeric id.
     *
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Allows to set a new title for the banner.
     *
     * Max: 250 chars
     * This filed must not be left empty
     *
     * @param string $title
     *
     * @return Banner
     */
    public function setTitle(string $title): Banner
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Returns the title of the banner.
     *
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * Allows to set a new description for the banner.
     *
     * Max: 250 chars
     * This filed must not be left empty
     *
     * @param string $description
     *
     * @return Banner
     */
    public function setDescription(string $description): Banner
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Returns the description of the banner.
     *
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Set the date and time on which this banner should be displayed
     *
     * This field may be null or empty
     *
     * @param DateTimeInterface|string $validFrom
     *
     * @return Banner
     * @throws Exception
     */
    public function setValidFrom($validFrom): Banner
    {
        if (empty($validFrom)) {
            $validFrom = null;
        }
        // If the date isn't null try to transform it to a DateTime Object.
        if (!$validFrom instanceof DateTimeInterface && $validFrom !== null) {
            $validFrom = new DateTime($validFrom);
        }

        $this->validFrom = $validFrom;

        return $this;
    }

    /**
     * Returns a datetime object containing the date this banner should displayed.
     *
     * @return DateTimeInterface
     */
    public function getValidFrom(): DateTimeInterface
    {
        return $this->validFrom;
    }

    /**
     * Sets the date and time this banner should stopped to been displayed
     *
     * @param DateTimeInterface|string $validTo
     *
     * @return Banner
     * @throws Exception
     */
    public function setValidTo($validTo): Banner
    {
        if (empty($validTo)) {
            $validTo = null;
        }
        // If the date isn't null try to transform it to a DateTime Object.
        if (!$validTo instanceof DateTimeInterface && $validTo !== null) {
            $validTo = new DateTime($validTo);
        }
        $this->validTo = $validTo;

        return $this;
    }

    /**
     * Returns a dateTime object with the datetime on which this banner should no more displayed
     *
     * @return DateTimeInterface
     */
    public function getValidTo(): DateTimeInterface
    {
        return $this->validTo;
    }

    /**
     * Sets the path and file name of the desktop banner image.
     * The file extension will be set also.
     *
     * Max chars: 100 char
     * This field must be filled
     *
     * @param string $desktopImage
     *
     * @return Banner
     */
    public function setDesktopImage(string $desktopImage): Banner
    {
        if (!empty($desktopImage)) {
            $fileInfo = pathinfo($desktopImage);
            $this->desktopExtension = $fileInfo['extension'];
            $this->desktopImage = $desktopImage;
        } else {
            $this->desktopExtension = '';
            $this->desktopImage = $desktopImage;
        }

        return $this;
    }

    /**
     * Returns the relative path and file name to the desktop banner image file
     *
     * @return string
     */
    public function getDesktopImage(): string
    {
        return $this->desktopImage;
    }

    /**
     * Sets the path and file name of the desktop banner image.
     * The file extension will be set also.
     *
     * Max chars: 100 char
     * This field must be filled
     *
     * @param string $mobileImage
     *
     * @return Banner
     */
    public function setMobileImage(string $mobileImage): Banner
    {
        if (!empty($mobileImage)) {
            $fileInfo = pathinfo($mobileImage);
            $this->mobileExtension = $fileInfo['extension'];
            $this->mobileImage = $mobileImage;
        } else {
            $this->mobileExtension = '';
            $this->mobileImage = $mobileImage;
        }

        return $this;
    }

    /**
     * Returns the relative path and file name to the mobile banner image file
     *
     * @return string
     */
    public function getMobileImage(): string
    {
        return $this->mobileImage;
    }

    /**
     * Sets the optional link which is bind to the banner.
     *
     * Max chars: 255
     * This field can be null
     *
     * @param string $link
     *
     * @return Banner
     */
    public function setLink(string $link): Banner
    {
        $this->link = $link;

        return $this;
    }

    /**
     * Returns the link which will be triggered if the banner is clicked
     *
     * @return string
     */
    public function getLink(): string
    {
        return $this->link;
    }

    /**
     * Set the HTML target parameter.
     *
     * There are just only two valid options
     * - _blank
     * -_new
     *
     * @param string $linkTarget
     *
     * @return Banner
     */
    public function setLinkTarget(string $linkTarget): Banner
    {
        $this->linkTarget = $linkTarget;

        return $this;
    }

    /**
     * Returns the HTML target parameter
     *
     * @return string
     */
    public function getLinkTarget(): string
    {
        return $this->linkTarget;
    }

    /**
     * Set the property id on which this banner should be displayed
     *
     * @param int $propertyId
     *
     * @return Banner
     */
    public function setPropertyId(int $propertyId): Banner
    {
        $this->propertyId = $propertyId;

        return $this;
    }

    /**
     * Returns the ID on which this banner should be displayed.
     *
     * @return int
     */
    public function getPropertyId(): int
    {
        return $this->propertyId;
    }

    /**
     * Sets the extension of the desktop banner image file
     *
     * Max chars: 25
     * This Field is optional
     *
     * @param string $desktopExtension
     *
     * @return Banner
     */
    public function setDesktopExtension(string $desktopExtension): Banner
    {
        $this->desktopExtension = $desktopExtension;

        return $this;
    }

    /**
     * Returns the extension of the desktop banner image.
     *
     * @return string
     */
    public function getDesktopExtension(): string
    {
        return $this->desktopExtension;
    }

    /**
     * Sets the extension of the mobile banner image file
     *
     * Max chars: 25
     * This Field is optional
     *
     * @param string $mobileExtension
     *
     * @return Banner
     */
    public function setMobileExtension(string $mobileExtension): Banner
    {
        $this->mobileExtension = $mobileExtension;

        return $this;
    }

    /**
     * Returns the extension of the mobile banner image.
     *
     * @return string
     */
    public function getMobileExtension(): string
    {
        return $this->mobileExtension;
    }
}
