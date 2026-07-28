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

final class MwTestimonialCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-testimonial';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        $imageId = $config->get('imageId')?->getValue();

        if (!\is_string($imageId) || $imageId === '') {
            return null;
        }

        $criteria = new Criteria([$imageId]);
        $collection = new CriteriaCollection();
        $collection->add('mw_testimonial_' . $slot->getUniqueIdentifier(), MediaDefinition::class, $criteria);

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $imageId = $config->get('imageId')?->getValue();
        $media = null;

        if (\is_string($imageId) && $imageId !== '') {
            $mediaResult = $result->get('mw_testimonial_' . $slot->getUniqueIdentifier());
            $media = $mediaResult?->get($imageId);
        }

        $slot->setData(new ArrayStruct([
            'image'      => $media,
            'quote'      => (string) ($config->get('quote')?->getStringValue() ?? ''),
            'authorName' => (string) ($config->get('authorName')?->getStringValue() ?? ''),
            'authorRole' => (string) ($config->get('authorRole')?->getStringValue() ?? ''),
        ]));
    }
}
