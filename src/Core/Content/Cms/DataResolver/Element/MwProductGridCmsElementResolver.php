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

final class MwProductGridCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-product-grid';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $ids = $this->collectProductIds($slot);

        if ($ids === []) {
            return null;
        }

        $criteria = new Criteria($ids);
        $criteria->addAssociation('cover.media');
        $criteria->addAssociation('manufacturer');
        $criteria->addAssociation('price');
        $criteria->addAssociation('calculatedPrices');
        $criteria->addAssociation('unit');
        $criteria->addAssociation('options.group');

        $collection = new CriteriaCollection();
        $collection->add('mw_product_grid_' . $slot->getUniqueIdentifier(), ProductDefinition::class, $criteria);

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $products = $result->get('mw_product_grid_' . $slot->getUniqueIdentifier());

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
            'columns' => (int) ($config->get('columns')?->getValue() ?? 4),
            'layoutType' => (string) ($config->get('layoutType')?->getValue() ?? 'standard'),
            'showDetails' => (bool) ($config->get('showDetails')?->getValue() ?? false),
            'buttonColor' => (string) ($config->get('buttonColor')?->getStringValue() ?? ''),
            'hoverColor' => (string) ($config->get('hoverColor')?->getStringValue() ?? '#ff6600'),
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
