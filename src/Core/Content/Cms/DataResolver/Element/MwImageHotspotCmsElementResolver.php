<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotCollection;
use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CmsSlotsDataResolver;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Struct\ArrayStruct;
use Shopware\Core\Framework\Uuid\Uuid;
use Psr\Container\ContainerInterface;

final class MwImageHotspotCmsElementResolver extends AbstractCmsElementResolver
{
    /**
     * Injected as a service locator (not a direct dependency) because CmsSlotsDataResolver's own
     * constructor eagerly builds every tagged "shopware.cms.data_resolver" service, including this
     * one — a direct dependency here would create an unresolvable circular construction loop.
     */
    public function __construct(private readonly ContainerInterface $locator)
    {
    }

    private function getCmsSlotsDataResolver(): CmsSlotsDataResolver
    {
        return $this->locator->get('cms_slots_data_resolver');
    }

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
                'dynamicElements' => $this->resolveDynamicElements($config, $t, $resolverContext),
            ];
        }

        $slot->setData(new ArrayStruct([
            'tabCount' => $tabCount,
            'tabs' => $tabs,
            'tooltipBgColor' => (string) ($config->get('tooltipBgColor')?->getStringValue() ?? '#1f2937'),
            'tooltipTextColor' => (string) ($config->get('tooltipTextColor')?->getStringValue() ?? '#ffffff'),
        ]));
    }

    /**
     * Resolves the optional, admin-configured extra content elements for a tab (e.g. text, image, or any
     * other registered CMS element) by delegating to Shopware's own CmsSlotsDataResolver, so they render
     * on the storefront exactly like a native CMS element would.
     *
     * @return CmsSlotEntity[]
     */
    private function resolveDynamicElements($config, int $t, ResolverContext $resolverContext): array
    {
        $dynamicCount = (int) ($config->get("tab{$t}DynamicCount")?->getValue() ?? 0);
        if ($dynamicCount <= 0) {
            return [];
        }

        $collection = new CmsSlotCollection();

        for ($d = 1; $d <= $dynamicCount; $d++) {
            $type = $config->get("tab{$t}Dynamic{$d}Type")?->getValue();
            if (!\is_string($type) || $type === '') {
                continue;
            }

            $rawConfig = $config->get("tab{$t}Dynamic{$d}Config")?->getStringValue();
            $fieldConfig = \is_string($rawConfig) ? json_decode($rawConfig, true) : null;
            if (!\is_array($fieldConfig)) {
                $fieldConfig = [];
            }

            $dynamicSlot = new CmsSlotEntity();
            $dynamicSlot->setId(Uuid::randomHex());
            $dynamicSlot->setType($type);
            $dynamicSlot->setSlot("tab{$t}Dynamic{$d}");
            $dynamicSlot->setTranslated(['config' => $fieldConfig]);

            $collection->add($dynamicSlot);
        }

        if ($collection->count() === 0) {
            return [];
        }

        return $this->getCmsSlotsDataResolver()->resolve($collection, $resolverContext)->getElements();
    }
}
