<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class MwLoadCapacityTableCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-load-capacity-table';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        return null; // all static fields, no DB lookups needed
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getConfig();

        if ($config === null) {
            $slot->setData(new ArrayStruct(['columnGroups' => []]));
            return;
        }

        $slot->setData(new ArrayStruct([
            'columnGroups' => $this->extractColumnGroups($config),
        ]));
    }

    /**
     * @param array<string, mixed> $config
     *
     * @return list<array{title: string, rangeLabel: string, rows: list<array{label: string, value: string}>}>
     */
    private function extractColumnGroups(array $config): array
    {
        $entry = $config['columnGroups'] ?? null;
        if (! is_array($entry)) {
            return [];
        }

        $value = $entry['value'] ?? null;
        if (! is_array($value)) {
            return [];
        }

        $result = [];
        foreach (array_values($value) as $group) {
            if (! is_array($group)) {
                continue;
            }
            /** @var array<string, mixed> $group */
            $result[] = [
                'title' => is_string($group['title'] ?? null) ? $group['title'] : '',
                'rangeLabel' => is_string($group['rangeLabel'] ?? null) ? $group['rangeLabel'] : '',
                'rows' => $this->extractRows($group),
            ];
        }

        return $result;
    }

    /**
     * @param array<string, mixed> $group
     *
     * @return list<array{label: string, value: string}>
     */
    private function extractRows(array $group): array
    {
        $rows = $group['rows'] ?? null;
        if (! is_array($rows)) {
            return [];
        }

        $result = [];
        foreach (array_values($rows) as $row) {
            if (! is_array($row)) {
                continue;
            }
            /** @var array<string, mixed> $row */
            $result[] = [
                'label' => is_string($row['label'] ?? null) ? $row['label'] : '',
                'value' => is_string($row['value'] ?? null) ? $row['value'] : '',
            ];
        }

        return $result;
    }
}
