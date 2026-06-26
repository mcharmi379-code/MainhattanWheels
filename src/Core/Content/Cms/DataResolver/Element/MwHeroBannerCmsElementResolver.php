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

final class MwHeroBannerCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-hero-banner';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        $mediaIds = [];

        $bgId = $config->get('backgroundMedia')?->getValue();
        if (\is_string($bgId) && $bgId !== '') {
            $mediaIds[] = $bgId;
        }

        $rightId = $config->get('rightMedia')?->getValue();
        if (\is_string($rightId) && $rightId !== '') {
            $mediaIds[] = $rightId;
        }

        if ($mediaIds === []) {
            return null;
        }

        $collection = new CriteriaCollection();
        $collection->add('mw_hero_banner_media_' . $slot->getUniqueIdentifier(), MediaDefinition::class, new Criteria($mediaIds));

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $uid = $slot->getUniqueIdentifier();
        $mediaCollection = $result->get('mw_hero_banner_media_' . $uid);

        $bgId = $config->get('backgroundMedia')?->getValue();
        $rightId = $config->get('rightMedia')?->getValue();

        $slot->setData(new ArrayStruct([
            'backgroundMedia' => \is_string($bgId) && $bgId !== '' ? $mediaCollection?->get($bgId) : null,
            'rightMedia'      => \is_string($rightId) && $rightId !== '' ? $mediaCollection?->get($rightId) : null,
        ]));
    }
}
