{block name="frontend_listing_article_banner"}
    {if $sPropertyBanners}
        {foreach $sPropertyBanners as $sPropertyBanner}
            <div class="banner--container">
                {if $sPropertyBanner.desktopMedia.thumbnails}
                    {if !$sPropertyBanner.link || $sPropertyBanner.link == "#" || $sPropertyBanner.link == ""}

                        <div class="content--title">{$sPropertyBanner.title|escape}</div>
                        <div class="banner--description" style="margin-bottom: 10px">{$sPropertyBanner.description|escape}</div>

                        {* Image only banner *}
                        {block name='frontend_listing_image_only_banner'}
                            <picture>
                                <source srcset="{$sPropertyBanner.desktopMedia.thumbnails[0].sourceSet}" media="(min-width: 48em)">

                                <img srcset="{$sPropertyBanner.mobileMedia.thumbnails[0].sourceSet}" alt="{$sPropertyBanner.description|escape}" class="banner--img" />
                            </picture>
                        {/block}
                    {else}

                        {* Normal banner *}
                        {block name='frontend_listing_normal_banner'}
                            <a href="{$sPropertyBanner.link}" class="banner--link" {if $sPropertyBanner.link_target}target="{$sPropertyBanner.link_target}"{/if} title="{$sPropertyBanner.description|escape}">
                                <picture>
                                    <source srcset="{$sPropertyBanner.desktopMedia.thumbnails[0].sourceSet}" media="(min-width: 48em)">

                                    <img srcset="{$sPropertyBanner.mobileMedia.thumbnails[0].sourceSet}" alt="{$sPropertyBanner.description|escape}" class="banner--img" />
                                </picture>
                            </a>
                        {/block}
                    {/if}
                {/if}
            </div>
        {/foreach}
    {/if}
{/block}
