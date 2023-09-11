<?php declare(strict_types=1);

namespace MagediaArticleBanner\Models\Banner;

use DateTime;
use DateTimeInterface;
use Exception;
use Doctrine\ORM\Mapping as ORM;
use Shopware\Components\Model\ModelEntity;

/**
 * Banner Model
 * <br>
 * This Model represented a banner which can be displayed on top of a given article.
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
 * - Article    =>  Shopware\Models\Article\Article     [1:n] [s_articles]
 * </code>
 *
 * Indices for magedia_article_banners:
 * <code>
 *   - PRIMARY KEY (`id`)
 * </code>
 *
 * @ORM\Table(name="magedia_article_banners")
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
     * Description for that banner. This description will be used as alt and title attribute
     *
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=60, nullable=false)
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
     * Relative path to the real banner image.
     *
     * @var string
     *
     * @ORM\Column(name="img", type="string", length=100, nullable=false)
     */
    private $image;

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
     * The id of the article for which this banner is for.
     *
     * @var int
     *
     * @ORM\Column(name="articleID", type="integer", nullable=false)
     */
    private $articleId;

    /**
     * The extension of the banner image file will be stored here
     *
     * @var string
     *
     * @ORM\Column(name="extension", type="string", length=25, nullable=false)
     */
    private $extension;

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
     * Allows to set a new description for the banner.
     *
     * Max: 60 chars
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
     * Sets the path and file name of the banner image.
     * The file extension will be set also.
     *
     * Max chars: 100 char
     * This field must be filled
     *
     * @param string $image
     *
     * @return Banner
     */
    public function setImage(string $image): Banner
    {
        if (!empty($image)) {
            $fileInfo = pathinfo($image);
            $this->extension = $fileInfo['extension'];
            $this->image = $image;
        } else {
            $this->extension = '';
            $this->image = $image;
        }

        return $this;
    }

    /**
     * Returns the relative path and file name to the banner image file
     *
     * @return string
     */
    public function getImage(): string
    {
        return $this->image;
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
     * Set the article id on which this banner should be displayed
     *
     * @param int $articleId
     *
     * @return Banner
     */
    public function setArticleId(int $articleId): Banner
    {
        $this->articleId = $articleId;

        return $this;
    }

    /**
     * Returns the ID on which this banner should be displayed.
     *
     * @return int
     */
    public function getArticleId(): int
    {
        return $this->articleId;
    }

    /**
     * Sets the extension of the banner image file
     *
     * Max chars: 25
     * This Field is optional
     *
     * @param string $extension
     *
     * @return Banner
     */
    public function setExtension(string $extension): Banner
    {
        $this->extension = $extension;

        return $this;
    }

    /**
     * Returns the extension of the banner image.
     *
     * @return string
     */
    public function getExtension(): string
    {
        return $this->extension;
    }

}
