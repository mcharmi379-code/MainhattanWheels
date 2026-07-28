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

final class MwTextVideoCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-text-video';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        $mediaFileConfig = $config->get('mediaFile');

        if ($mediaFileConfig === null || $mediaFileConfig->isMapped() || $mediaFileConfig->getValue() === null) {
            return null;
        }

        $mediaId = $mediaFileConfig->getValue();

        $collection = new CriteriaCollection();
        $collection->add(
            'media_' . $slot->getUniqueIdentifier(),
            MediaDefinition::class,
            new Criteria([$mediaId])
        );

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $mediaFileConfig = $config->get('mediaFile');
        $media = null;

        if ($mediaFileConfig !== null && !$mediaFileConfig->isMapped() && $mediaFileConfig->getValue() !== null) {
            $mediaId = $mediaFileConfig->getValue();
            $mediaCollection = $result->get('media_' . $slot->getUniqueIdentifier());
            if ($mediaCollection !== null) {
                /** @var MediaEntity|null $media */
                $media = $mediaCollection->get($mediaId);
            }
        }

        $slot->setData(new ArrayStruct(['media' => $media]));
    }
}
