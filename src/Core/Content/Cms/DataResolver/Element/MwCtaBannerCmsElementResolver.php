<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwCtaBannerCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-cta-banner';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        return null;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();

        $slot->setData(new ArrayStruct([
            'text' => $config->get('text')?->getStringValue() ?? '',
            'textColor' => $config->get('textColor')?->getStringValue() ?? '',
            'bannerBgColor' => $config->get('bannerBgColor')?->getStringValue() ?? '',
            'buttonLabel' => $config->get('buttonLabel')?->getStringValue() ?? '',
            'buttonLinkType' => $config->get('buttonLinkType')?->getStringValue() ?? 'internal',
            'buttonLinkUrl' => $config->get('buttonLinkUrl')?->getStringValue() ?? '',
            'buttonNewTab' => $config->get('buttonNewTab')?->getBoolValue() ?? false,
            'buttonBgColor' => $config->get('buttonBgColor')?->getStringValue() ?? '',
            'buttonTextColor' => $config->get('buttonTextColor')?->getStringValue() ?? '',
        ]));
    }
}
