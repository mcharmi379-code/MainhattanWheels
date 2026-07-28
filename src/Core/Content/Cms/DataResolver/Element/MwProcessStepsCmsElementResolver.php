<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwProcessStepsCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-process-steps';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        return null; // all static fields, no DB lookups needed
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();

        $steps = [];
        $stepCount = (int) ($config->get('stepCount')?->getValue() ?? 4);

        for ($i = 1; $i <= $stepCount; $i++) {
            $title    = (string) ($config->get("step{$i}Title")?->getStringValue() ?? '');
            $subTitle = (string) ($config->get("step{$i}SubTitle")?->getStringValue() ?? '');
            $desc     = (string) ($config->get("step{$i}Desc")?->getStringValue() ?? '');
            if ($title !== '' || $subTitle !== '' || $desc !== '') {
                $steps[] = [
                    'number'      => $i,
                    'title'       => $title,
                    'subTitle'    => $subTitle,
                    'description' => $desc,
                ];
            }
        }

        $slot->setData(new ArrayStruct([
            'heading'     => (string) ($config->get('heading')?->getStringValue() ?? ''),
            'subheading'  => (string) ($config->get('subheading')?->getStringValue() ?? ''),
            'accentColor' => (string) ($config->get('accentColor')?->getStringValue() ?? '#e8671a'),
            'stepCount'   => $stepCount,
            'steps'       => $steps,
        ]));
    }
}
