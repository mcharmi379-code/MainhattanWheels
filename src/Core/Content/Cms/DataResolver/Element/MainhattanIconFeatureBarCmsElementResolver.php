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

final class MainhattanIconFeatureBarCmsElementResolver extends AbstractCmsElementResolver
{
    public function __construct(private readonly string $projectDir)
    {
    }

    public function getType(): string
    {
        return 'mainhattan-icon-feature-bar';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $mediaIds = $this->collectMediaIds($slot);

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
        $items = $slot->getFieldConfig()->get('items')?->getValue();

        if (! is_array($items)) {
            $slot->setData(new ArrayStruct(['items' => []]));
            return;
        }

        $mediaCollection = $result->get('media_' . $slot->getUniqueIdentifier());
        $enriched = [];

        foreach ($items as $item) {
            if (! is_array($item)) {
                continue;
            }

            $iconId = $item['icon'] ?? null;
            $media = (is_string($iconId) && $iconId !== '') ? $mediaCollection?->get($iconId) : null;
            $item['iconMedia'] = $media;
            $item['svgContent'] = null;

            if ($media !== null && $media->getMimeType() === 'image/svg+xml' && !empty($item['svgColor'])) {
                $filePath = $this->projectDir . '/public/media/' . $media->getPath();
                if (is_file($filePath)) {
                    $svg = file_get_contents($filePath);
                    if ($svg !== false) {
                        // Remove XML declaration, inject fill=currentColor, remove fixed dimensions
                        $svg = preg_replace('/<\?xml[^?]*\?>/', '', $svg);
                        $svg = preg_replace('/<svg\s/', '<svg fill="currentColor" ', $svg, 1);
                        $svg = preg_replace('/\s(width|height)="[^"]*"/', '', $svg);
                        $item['svgContent'] = trim($svg);
                    }
                }
            }

            $enriched[] = $item;
        }

        $slot->setData(new ArrayStruct(['items' => $enriched]));
    }

    /**
     * @return list<string>
     */
    private function collectMediaIds(CmsSlotEntity $slot): array
    {
        $items = $slot->getFieldConfig()->get('items')?->getValue();

        if (! is_array($items)) {
            return [];
        }

        $ids = [];

        foreach ($items as $item) {
            if (! is_array($item)) {
                continue;
            }

            $iconId = $item['icon'] ?? null;

            if (is_string($iconId) && $iconId !== '') {
                $ids[] = $iconId;
            }
        }

        return array_values(array_unique($ids));
    }
}
