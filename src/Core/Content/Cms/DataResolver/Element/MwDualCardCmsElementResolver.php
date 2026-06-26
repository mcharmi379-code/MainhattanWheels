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

final class MwDualCardCmsElementResolver extends AbstractCmsElementResolver
{
    public function __construct(private readonly string $projectDir)
    {
    }

    public function getType(): string
    {
        return 'mw-dual-card';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $mediaIds = $this->collectAllMediaIds($slot);

        if ($mediaIds === []) {
            return null;
        }

        $collection = new CriteriaCollection();
        $collection->add(
            'media_' . $slot->getUniqueIdentifier(),
            MediaDefinition::class,
            new Criteria($mediaIds),
        );

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $mediaCollection = $result->get('media_' . $slot->getUniqueIdentifier());

        // Resolve right background image URL
        $rightBgMediaId = $config->get('rightBgMediaId')?->getValue();
        $rightBgMedia = (is_string($rightBgMediaId) && $rightBgMediaId !== '')
            ? $mediaCollection?->get($rightBgMediaId)
            : null;
        $rightBgMediaUrl = $rightBgMedia?->getUrl() ?? ($config->get('rightBgMediaUrl')?->getValue() ?? null);

        // Enrich right features with media + SVG content
        $features = $config->get('rightFeatures')?->getValue();
        $enriched = [];

        if (is_array($features)) {
            foreach ($features as $feature) {
                if (!is_array($feature)) {
                    continue;
                }

                $iconId = $feature['iconId'] ?? null;
                $media = (is_string($iconId) && $iconId !== '') ? $mediaCollection?->get($iconId) : null;
                $feature['iconUrl'] = $media?->getUrl() ?? ($feature['iconUrl'] ?? null);
                $feature['iconMimeType'] = $media?->getMimeType() ?? ($feature['iconMimeType'] ?? null);
                $feature['svgContent'] = null;

                if ($media !== null && $media->getMimeType() === 'image/svg+xml') {
                    $svgContent = $this->loadSvg($media->getPath());
                    if ($svgContent !== null) {
                        $feature['svgContent'] = $svgContent;
                    }
                }

                $enriched[] = $feature;
            }
        }

        $slot->setData(new ArrayStruct([
            'rightFeatures' => $enriched,
            'rightBgMediaUrl' => $rightBgMediaUrl,
        ]));
    }

    private function loadSvg(string $path): ?string
    {
        $filePath = $this->projectDir . '/public/media/' . $path;

        if (!is_file($filePath)) {
            return null;
        }

        $svg = file_get_contents($filePath);

        if ($svg === false) {
            return null;
        }

        $svg = preg_replace('/<\?xml[^?]*\?>/', '', $svg) ?? $svg;
        $svg = preg_replace('/<svg\s/', '<svg fill="currentColor" ', $svg, 1) ?? $svg;
        $svg = preg_replace('/\s(width|height)="[^"]*"/', '', $svg) ?? $svg;

        return trim($svg);
    }

    /**
     * @return list<string>
     */
    private function collectAllMediaIds(CmsSlotEntity $slot): array
    {
        $config = $slot->getFieldConfig();
        $ids = [];

        $rightBgMediaId = $config->get('rightBgMediaId')?->getValue();
        if (is_string($rightBgMediaId) && $rightBgMediaId !== '') {
            $ids[] = $rightBgMediaId;
        }

        $features = $config->get('rightFeatures')?->getValue();
        if (is_array($features)) {
            foreach ($features as $feature) {
                if (!is_array($feature)) {
                    continue;
                }
                $iconId = $feature['iconId'] ?? null;
                if (is_string($iconId) && $iconId !== '') {
                    $ids[] = $iconId;
                }
            }
        }

        return array_values(array_unique($ids));
    }
}
