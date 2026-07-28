<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class IctImageGalleryCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'ict-image-gallery';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $rawItems = array_values($slot->getFieldConfig()->get('galleryItems')?->getArrayValue() ?? []);
        $mediaIds = [];

        foreach ($rawItems as $item) {
            if (\is_array($item) && \is_string($item['mediaId'] ?? null) && $item['mediaId'] !== '') {
                $mediaIds[] = $item['mediaId'];
            }
        }

        $mediaIds = array_values(array_unique($mediaIds));

        if ($mediaIds === []) {
            return null;
        }

        $collection = new CriteriaCollection();
        $collection->add('media_' . $slot->getUniqueIdentifier(), MediaDefinition::class, new Criteria($mediaIds));

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $rawItems = array_values($config->get('galleryItems')?->getArrayValue() ?? []);
        $mediaResult = $result->get('media_' . $slot->getUniqueIdentifier());
        $columns = $this->normalizeColumns($config->get('columns')?->getValue());

        $galleryItems = [];
        foreach ($rawItems as $item) {
            if (! \is_array($item)) {
                continue;
            }

            $mediaId = $item['mediaId'] ?? null;
            if (! \is_string($mediaId) || $mediaId === '') {
                continue;
            }

            /** @var MediaEntity|null $media */
            $media = $mediaResult?->get($mediaId);
            if (! $media instanceof MediaEntity) {
                continue;
            }

            $galleryItems[] = [
                'media' => $media,
                'mediaId' => $mediaId,
                'mediaUrl' => $media->getUrl(),
                'title' => \is_string($item['title'] ?? null) ? $item['title'] : '',
            ];
        }

        $slot->setData(new ArrayStruct([
            'galleryTitle' => $config->get('galleryTitle')?->getStringValue() ?? '',
            'columns' => $columns,
            'galleryItems' => $galleryItems,
        ]));
    }

    private function normalizeColumns(mixed $columns): int
    {
        $value = is_scalar($columns) || $columns === null ? (int) $columns : 0;

        return max(1, min(6, $value));
    }
}
