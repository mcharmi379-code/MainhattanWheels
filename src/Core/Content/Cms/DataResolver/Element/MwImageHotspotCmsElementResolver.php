<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwImageHotspotCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-image-hotspot';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        $tabCount = (int) ($config->get('tabCount')?->getValue() ?? 3);
        $mediaIds = [];

        for ($t = 1; $t <= $tabCount; $t++) {
            $mediaId = $config->get("tab{$t}MediaId")?->getValue();
            if (\is_string($mediaId) && $mediaId !== '') {
                $mediaIds[] = $mediaId;
            }

            $iconId = $config->get("tab{$t}IconId")?->getValue();
            if (\is_string($iconId) && $iconId !== '') {
                $mediaIds[] = $iconId;
            }
        }

        if (empty($mediaIds)) {
            return null;
        }

        $criteria = new Criteria($mediaIds);
        $collection = new CriteriaCollection();
        $collection->add('mw_image_hotspot_' . $slot->getUniqueIdentifier(), MediaDefinition::class, $criteria);

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $tabCount = (int) ($config->get('tabCount')?->getValue() ?? 3);
        
        $mediaResult = $result->get('mw_image_hotspot_' . $slot->getUniqueIdentifier());
        $tabs = [];

        for ($t = 1; $t <= $tabCount; $t++) {
            $mediaId = $config->get("tab{$t}MediaId")?->getValue();
            $iconId = $config->get("tab{$t}IconId")?->getValue();
            
            $media = null;
            $icon = null;

            if ($mediaResult !== null) {
                if (\is_string($mediaId) && $mediaId !== '') {
                    $media = $mediaResult->get($mediaId);
                }
                if (\is_string($iconId) && $iconId !== '') {
                    $icon = $mediaResult->get($iconId);
                }
            }

            $hotspotCount = (int) ($config->get("tab{$t}HotspotCount")?->getValue() ?? 3);
            $hotspots = [];

            for ($h = 1; $h <= $hotspotCount; $h++) {
                $top = (float) ($config->get("tab{$t}Hotspot{$h}Top")?->getValue() ?? 50.0);
                $left = (float) ($config->get("tab{$t}Hotspot{$h}Left")?->getValue() ?? 50.0);
                $title = (string) ($config->get("tab{$t}Hotspot{$h}Title")?->getStringValue() ?? '');
                $text = (string) ($config->get("tab{$t}Hotspot{$h}Text")?->getStringValue() ?? '');

                $hotspots[] = [
                    'index' => $h,
                    'top' => $top,
                    'left' => $left,
                    'title' => $title,
                    'text' => $text,
                ];
            }

            $tabs[] = [
                'index' => $t,
                'title' => (string) ($config->get("tab{$t}Title")?->getStringValue() ?? "Tab {$t}"),
                'icon' => $icon,
                'media' => $media,
                'hotspots' => $hotspots,
            ];
        }

        $slot->setData(new ArrayStruct([
            'tabCount' => $tabCount,
            'tabs' => $tabs,
            'tooltipBgColor' => (string) ($config->get('tooltipBgColor')?->getStringValue() ?? '#1f2937'),
            'tooltipTextColor' => (string) ($config->get('tooltipTextColor')?->getStringValue() ?? '#ffffff'),
        ]));
    }
}
