<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Category\CategoryDefinition;
use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwSubcategoryGridCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-subcategory-grid';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $categoryId = $slot->getFieldConfig()->get('categoryId')?->getValue();

        if (!\is_string($categoryId) || $categoryId === '') {
            return null;
        }

        $collection = new CriteriaCollection();

        $mainCriteria = new Criteria([$categoryId]);
        $mainCriteria->addAssociation('media');
        $collection->add('mw_subcategory_grid_main_' . $slot->getUniqueIdentifier(), CategoryDefinition::class, $mainCriteria);

        $subCriteria = new Criteria();
        $subCriteria->addAssociation('media');
        $subCriteria->addFilter(new EqualsFilter('parentId', $categoryId));
        $subCriteria->addFilter(new EqualsFilter('active', true));
        $collection->add('mw_subcategory_grid_children_' . $slot->getUniqueIdentifier(), CategoryDefinition::class, $subCriteria);

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $uid = $slot->getUniqueIdentifier();
        $config = $slot->getFieldConfig();

        $mainCategoryId = $config->get('categoryId')?->getValue();
        $mainCategoryResult = $result->get('mw_subcategory_grid_main_' . $uid);
        $childrenResult = $result->get('mw_subcategory_grid_children_' . $uid);

        $mainCategory = \is_string($mainCategoryId) && $mainCategoryId !== ''
            ? $mainCategoryResult?->get($mainCategoryId)
            : null;

        $subCategories = [];
        foreach ($childrenResult?->getEntities() ?? [] as $child) {
            if ($child !== null) {
                $subCategories[] = $child;
            }
        }

        $slot->setData(new ArrayStruct([
            'title' => $config->get('title')?->getStringValue() ?? '',
            'category' => $mainCategory,
            'subCategories' => $subCategories,
        ]));
    }
}
