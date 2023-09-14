{block name="frontend_listing_article_banner"}
    {if $sArticleBanner}
        <div class="banner--container">

            {if $sArticleBanner.desktopMedia.thumbnails}
                {if !$sArticleBanner.link || $sArticleBanner.link == "#" || $sArticleBanner.link == ""}

                    {* Image only banner *}
                    {block name='frontend_listing_image_only_banner'}
                        <picture>
                            <source srcset="{$sArticleBanner.desktopMedia.thumbnails[0].sourceSet}" media="(min-width: 48em)">

                            <img srcset="{$sArticleBanner.mobileMedia.thumbnails[0].sourceSet}" alt="{$sArticleBanner.description|escape}" class="banner--img" />
                        </picture>
                    {/block}
                {else}

                    {* Normal banner *}
                    {block name='frontend_listing_normal_banner'}
                        <a href="{$sArticleBanner.link}" class="banner--link" {if $sArticleBanner.link_target}target="{$sArticleBanner.link_target}"{/if} title="{$sArticleBanner.description|escape}">
                            <picture>
                                <source srcset="{$sArticleBanner.desktopMedia.thumbnails[0].sourceSet}" media="(min-width: 48em)">

                                <img srcset="{$sArticleBanner.mobileMedia.thumbnails[0].sourceSet}" alt="{$sArticleBanner.description|escape}" class="banner--img" />
                            </picture>
                        </a>
                    {/block}
                {/if}
            {/if}
        </div>
    {/if}
{/block}
