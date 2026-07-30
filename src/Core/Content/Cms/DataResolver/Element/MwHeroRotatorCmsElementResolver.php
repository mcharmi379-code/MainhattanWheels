<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwHeroRotatorCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-hero-rotator';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        return null; // all static fields, no DB lookups needed
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();

        $lines = [];
        $lineCount = (int) ($config->get('lineCount')?->getValue() ?? 3);

        for ($i = 1; $i <= $lineCount; $i++) {
            $text = (string) ($config->get("transformText{$i}")?->getStringValue() ?? '');
            if ($text !== '') {
                $lines[] = $text;
            }
        }

        $slot->setData(new ArrayStruct([
            'backgroundColor' => (string) ($config->get('backgroundColor')?->getStringValue() ?? '#3a3a3a'),
            'titleText' => (string) ($config->get('titleText')?->getStringValue() ?? ''),
            'titleColor' => (string) ($config->get('titleColor')?->getStringValue() ?? '#ffffff'),
            'lines' => $lines,
            'transformTextColor' => (string) ($config->get('transformTextColor')?->getStringValue() ?? '#e8540a'),
            'transitionDuration' => (int) ($config->get('transitionDuration')?->getValue() ?? 400),
            'rotationInterval' => (int) ($config->get('rotationInterval')?->getValue() ?? 3000),
        ]));
    }
}
