<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwTextBoxCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-text-box';
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
            'bgColor' => $config->get('bgColor')?->getStringValue() ?? '',
            'textColor' => $config->get('textColor')?->getStringValue() ?? '',
            'hoverBgColor' => $config->get('hoverBgColor')?->getStringValue() ?? '',
            'hoverTextColor' => $config->get('hoverTextColor')?->getStringValue() ?? '',
        ]));
    }
}
