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

final class MwProductQuickOrderCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-product-quick-order';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        $productId = $config->get('productId')?->getValue();

        if (!\is_string($productId) || $productId === '') {
            return null;
        }

        $criteria = new Criteria([$productId]);
        $criteria->addAssociation('cover.media');
        $criteria->addAssociation('price');
        $criteria->addAssociation('calculatedPrices');
        $criteria->addAssociation('unit');

        $collection = new CriteriaCollection();
        $collection->add('mw_product_quick_order_' . $slot->getUniqueIdentifier(), ProductDefinition::class, $criteria);

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $products = $result->get('mw_product_quick_order_' . $slot->getUniqueIdentifier());

        $productId = $config->get('productId')?->getValue();
        $product = \is_string($productId) && $productId !== '' ? $products?->get($productId) : null;

        $slot->setData(new ArrayStruct([
            'product'        => $product,
            'buttonText'     => (string) ($config->get('buttonText')?->getStringValue() ?? 'View & order now'),
            'quantityLabel'  => (string) ($config->get('quantityLabel')?->getStringValue() ?? 'Crowd'),
            'buttonBgColor'  => (string) ($config->get('buttonBgColor')?->getStringValue() ?? '#e8671a'),
            'buttonTextColor' => (string) ($config->get('buttonTextColor')?->getStringValue() ?? '#ffffff'),
        ]));
    }
}
