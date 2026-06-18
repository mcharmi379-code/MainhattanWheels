<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwWheelShowcaseCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-wheel-showcase';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $ids = $this->collectProductIds($slot);

        if ($ids === []) {
            return null;
        }

        $criteria = new Criteria($ids);
        $criteria->addAssociation('cover.media');
        $criteria->addAssociation('media.media');
        $criteria->addAssociation('properties.group');
        $criteria->addAssociation('manufacturer');
        $criteria->addAssociation('prices');
        $criteria->addAssociation('calculatedPrices');
        $criteria->addAssociation('unit');

        $collection = new CriteriaCollection();
        $collection->add('mw_wheel_showcase_' . $slot->getUniqueIdentifier(), ProductDefinition::class, $criteria);

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $products = $result->get('mw_wheel_showcase_' . $slot->getUniqueIdentifier());

        $selected = [];
        $cards = $config->get('cards')?->getArrayValue() ?? [];

        foreach ($cards as $card) {
            if (!\is_array($card)) {
                continue;
            }

            $productId = $card['productId'] ?? null;
            if (!\is_string($productId) || $productId === '') {
                continue;
            }

            $product = $products?->get($productId);
            if ($product !== null) {
                $selected[] = [
                    'title' => $card['title'] ?? '',
                    'product' => $product,
                ];
            }
        }

        $slot->setData(new ArrayStruct([
            'cards' => $selected,
            'title' => (string) ($config->get('title')?->getValue() ?? ''),
            'buttonText' => (string) ($config->get('buttonText')?->getValue() ?? 'Jetzt Angebot anfordern!'),
            'buttonLink' => (string) ($config->get('buttonLink')?->getValue() ?? ''),
            'show360' => (bool) ($config->get('show360')?->getValue() ?? true),
        ]));
    }

    /**
     * @return list<string>
     */
    private function collectProductIds(CmsSlotEntity $slot): array
    {
        $ids = [];

        $cards = $slot->getFieldConfig()->get('cards')?->getArrayValue() ?? [];
        foreach ($cards as $card) {
            if (!\is_array($card)) {
                continue;
            }

            $productId = $card['productId'] ?? null;
            if (\is_string($productId) && $productId !== '') {
                $ids[] = $productId;
            }
        }

        return array_values(array_unique($ids));
    }
}
