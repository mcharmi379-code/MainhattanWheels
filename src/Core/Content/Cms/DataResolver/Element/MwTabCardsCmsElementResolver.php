<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwTabCardsCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-tab-cards';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        if ($config->count() === 0) {
            return null;
        }

        $cardsConfig = $config->get('cards');
        if ($cardsConfig === null || !is_array($cardsConfig->getValue())) {
            return null;
        }

        $mediaIds = [];
        $productIds = [];

        foreach ($cardsConfig->getValue() as $card) {
            if (!is_array($card)) {
                continue;
            }
            $mediaId = $card['mediaId'] ?? $card['media'] ?? null;
            if (is_string($mediaId) && $mediaId !== '') {
                $mediaIds[] = $mediaId;
            } elseif (is_array($mediaId) && isset($mediaId['id']) && is_string($mediaId['id'])) {
                $mediaIds[] = $mediaId['id'];
            }

            if (isset($card['productLinks']) && is_array($card['productLinks'])) {
                foreach ($card['productLinks'] as $link) {
                    if (!is_array($link)) {
                        continue;
                    }
                    $pId = $link['productId'] ?? null;
                    if (is_string($pId) && $pId !== '') {
                        $productIds[] = $pId;
                    }
                }
            }
        }

        if ($mediaIds === [] && $productIds === []) {
            return null;
        }

        $collection = new CriteriaCollection();

        if ($mediaIds !== []) {
            $collection->add('media_' . $slot->getUniqueIdentifier(), MediaDefinition::class, new Criteria(array_values(array_unique($mediaIds))));
        }

        if ($productIds !== []) {
            $productCriteria = new Criteria(array_values(array_unique($productIds)));
            $productCriteria->addAssociation('seoUrls');
            $collection->add('product_' . $slot->getUniqueIdentifier(), ProductDefinition::class, $productCriteria);
        }

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $data = new ArrayStruct();

        $mediaCollection = $result->get('media_' . $slot->getUniqueIdentifier());
        $productCollection = $result->get('product_' . $slot->getUniqueIdentifier());

        $cardsConfig = $config->get('cards');
        $cards = [];

        if ($cardsConfig !== null && is_array($cardsConfig->getValue())) {
            foreach ($cardsConfig->getValue() as $card) {
                if (!is_array($card)) {
                    continue;
                }
                $cardItem = $card;
                $mediaId = $card['mediaId'] ?? $card['media'] ?? null;
                if (is_array($mediaId) && isset($mediaId['id'])) {
                    $mediaId = $mediaId['id'];
                }

                if (is_string($mediaId) && $mediaId !== '' && $mediaCollection !== null) {
                    $cardItem['mediaEntity'] = $mediaCollection->get($mediaId);
                } else {
                    $cardItem['mediaEntity'] = null;
                }

                $productLinks = [];
                if (isset($card['productLinks']) && is_array($card['productLinks'])) {
                    foreach ($card['productLinks'] as $link) {
                        if (!is_array($link)) {
                            continue;
                        }
                        $linkItem = $link;
                        $pId = $link['productId'] ?? null;
                        if (is_string($pId) && $pId !== '' && $productCollection !== null) {
                            $linkItem['productEntity'] = $productCollection->get($pId);
                        } else {
                            $linkItem['productEntity'] = null;
                        }
                        $productLinks[] = $linkItem;
                    }
                }
                $cardItem['productLinks'] = $productLinks;

                $cards[] = $cardItem;
            }
        }

        $data->set('cards', $cards);
        $slot->setData($data);
    }
}
