<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Category\CategoryDefinition;
use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwProductCarouselCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-product-carousel';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $categoryId = $slot->getFieldConfig()->get('categoryId')?->getValue();

        if (!\is_string($categoryId) || $categoryId === '') {
            return null;
        }

        $collection = new CriteriaCollection();
        $categoryCriteria = new Criteria([$categoryId]);
        $categoryCriteria->addAssociation('media');
        $collection->add('mw_product_carousel_category_' . $slot->getUniqueIdentifier(), CategoryDefinition::class, $categoryCriteria);

        $productCriteria = new Criteria();
        $productCriteria->setLimit(3);
        $productCriteria->addAssociation('cover.media');
        $productCriteria->addAssociation('manufacturer');
        $productCriteria->addAssociation('price');
        $productCriteria->addAssociation('calculatedPrices');
        $productCriteria->addFilter(new EqualsFilter('categoriesRo.id', $categoryId));
        $productCriteria->addSorting(new FieldSorting('createdAt', FieldSorting::ASCENDING));
        $collection->add('mw_product_carousel_products_' . $slot->getUniqueIdentifier(), ProductDefinition::class, $productCriteria);

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $productsResult = $result->get('mw_product_carousel_products_' . $slot->getUniqueIdentifier());
        $categoryResult = $result->get('mw_product_carousel_category_' . $slot->getUniqueIdentifier());

        $categoryId = $config->get('categoryId')?->getValue();
        $category = \is_string($categoryId) && $categoryId !== '' ? $categoryResult?->get($categoryId) : null;

        $items = [];
        foreach ($productsResult?->getEntities() ?? [] as $product) {
            if ($product !== null) {
                $items[] = [
                    'product' => $product,
                    'title' => '',
                ];
            }
        }

        if ($items === [] && $category !== null) {
            $slot->setData(new ArrayStruct([
                'headline' => $config->get('headline')?->getStringValue() ?? '',
                'ctaLabel' => $config->get('ctaLabel')?->getStringValue() ?? 'All Products',
                'category' => $category,
                'items' => [],
                'hasProducts' => false,
            ]));

            return;
        }

        $slot->setData(new ArrayStruct([
            'headline' => $config->get('headline')?->getStringValue() ?? '',
            'ctaLabel' => $config->get('ctaLabel')?->getStringValue() ?? 'All Products',
            'category' => $category,
            'items' => $items,
            'hasProducts' => $items !== [],
        ]));
    }
}
