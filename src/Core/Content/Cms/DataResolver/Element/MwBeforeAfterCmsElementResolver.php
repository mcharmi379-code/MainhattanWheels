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

final class MwBeforeAfterCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-before-after';
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

        if (!is_array($items)) {
            $slot->setData(new ArrayStruct(['items' => []]));
            return;
        }

        $mediaCollection = $result->get('media_' . $slot->getUniqueIdentifier());
        $enriched = [];

        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }

            $beforeImageId = $item['beforeImage'] ?? null;
            $afterImageId = $item['afterImage'] ?? null;

            $beforeMedia = (is_string($beforeImageId) && $beforeImageId !== '') ? $mediaCollection?->get($beforeImageId) : null;
            $afterMedia = (is_string($afterImageId) && $afterImageId !== '') ? $mediaCollection?->get($afterImageId) : null;

            $item['beforeImageMedia'] = $beforeMedia;
            $item['afterImageMedia'] = $afterMedia;

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

        if (!is_array($items)) {
            return [];
        }

        $ids = [];

        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }

            $beforeImageId = $item['beforeImage'] ?? null;
            $afterImageId = $item['afterImage'] ?? null;

            if (is_string($beforeImageId) && $beforeImageId !== '') {
                $ids[] = $beforeImageId;
            }

            if (is_string($afterImageId) && $afterImageId !== '') {
                $ids[] = $afterImageId;
            }
        }

        return array_values(array_unique($ids));
    }
}
