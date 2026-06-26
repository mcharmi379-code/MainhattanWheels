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

final class MwProfileTabsCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-profile-tabs';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $mediaId = $slot->getFieldConfig()->get('media')?->getValue();

        if (!\is_string($mediaId) || $mediaId === '') {
            return null;
        }

        $collection = new CriteriaCollection();
        $collection->add('mw_profile_tabs_media_' . $slot->getUniqueIdentifier(), MediaDefinition::class, new Criteria([$mediaId]));

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $mediaId = $config->get('media')?->getValue();
        $media = \is_string($mediaId) && $mediaId !== ''
            ? $result->get('mw_profile_tabs_media_' . $slot->getUniqueIdentifier())?->get($mediaId)
            : null;

        $slot->setData(new ArrayStruct([
            'subheadline' => $config->get('subheadline')?->getStringValue() ?? '',
            'name' => $config->get('name')?->getStringValue() ?? '',
            'role' => $config->get('role')?->getStringValue() ?? '',
            'tabs' => $config->get('tabs')?->getValue() ?? [],
            'buttonLabel' => $config->get('buttonLabel')?->getStringValue() ?? '',
            'buttonLink' => $config->get('buttonLink')?->getStringValue() ?? '',
            'buttonNewTab' => (bool) ($config->get('buttonNewTab')?->getValue() ?? false),
            'buttonType' => $config->get('buttonType')?->getStringValue() ?? 'internal',
            'media' => $media,
        ]));
    }
}
