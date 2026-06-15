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
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwCategoryShowcaseCmsElementResolver extends AbstractCmsElementResolver
{
    private const TYPE = 'mw-category-showcase';

    public function getType(): string
    {
        return self::TYPE;
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $ids = $this->collectIds($slot);

        if ($ids === []) {
            return null;
        }

        $criteria = new Criteria($ids);
        $criteria->addAssociation('media');

        $collection = new CriteriaCollection();
        $collection->add('mw_showcase_' . $slot->getUniqueIdentifier(), CategoryDefinition::class, $criteria);

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $categoriesResult = $result->get('mw_showcase_' . $slot->getUniqueIdentifier());

        $mainCategoryId = $config->get('mainCategory')?->getStringValue() ?? '';
        $mainCategory = ($mainCategoryId !== '' && $categoriesResult !== null)
            ? $categoriesResult->get($mainCategoryId)
            : null;

        $subCategoryIds = $config->get('subCategories')?->getArrayValue() ?? [];
        $subCategories = [];

        foreach ($subCategoryIds as $subId) {
            if (! is_string($subId) || $subId === '' || $categoriesResult === null) {
                continue;
            }

            $cat = $categoriesResult->get($subId);

            if ($cat !== null) {
                $subCategories[] = $cat;
            }
        }

        $slot->setData(new ArrayStruct([
            'mainCategory' => $mainCategory,
            'subCategories' => $subCategories,
            'showAllLabel' => $config->get('showAllLabel')?->getStringValue() ?? '',
            'showAllColor' => $config->get('showAllColor')?->getStringValue() ?? '',
            'learnMoreLabel' => $config->get('learnMoreLabel')?->getStringValue() ?? '',
            'learnMoreColor' => $config->get('learnMoreColor')?->getStringValue() ?? '',
            'cardBorderColor' => $config->get('cardBorderColor')?->getStringValue() ?? '',
            'cardBgColor' => $config->get('cardBgColor')?->getStringValue() ?? '',
            'visibleCards' => $config->get('visibleCards')?->getValue() ?? 5,
        ]));
    }

    /**
     * @return list<string>
     */
    private function collectIds(CmsSlotEntity $slot): array
    {
        $config = $slot->getFieldConfig();
        $ids = [];

        $mainId = $config->get('mainCategory')?->getStringValue() ?? '';

        if ($mainId !== '') {
            $ids[] = $mainId;
        }

        foreach ($config->get('subCategories')?->getArrayValue() ?? [] as $id) {
            if (is_string($id) && $id !== '') {
                $ids[] = $id;
            }
        }

        return array_values(array_unique($ids));
    }
}
