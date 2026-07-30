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
            $slot->setData(new ArrayStruct(['columnGroups' => [], 'columnsPerRow' => 6]));
            return;
        }

        $slot->setData(new ArrayStruct([
            'columnGroups' => $this->extractColumnGroups($config),
            'columnsPerRow' => $this->extractColumnsPerRow($config),
        ]));
    }

    /**
     * @param array<string, mixed> $config
     */
    private function extractColumnsPerRow(array $config): int
    {
        $value = $config['columnsPerRow']['value'] ?? 6;
        $columns = is_numeric($value) ? (int) $value : 6;

        return max(1, min(12, $columns));
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
            $title = is_string($group['title'] ?? null) ? trim($group['title']) : '';
            $rangeLabel = is_string($group['rangeLabel'] ?? null) ? trim($group['rangeLabel']) : '';
            $rows = $this->extractRows($group);

            // Skip a column entirely only when there is truly nothing to show for it
            // (no header text and no rows) - a header-only column (e.g. just a range
            // label) is intentional content, not a blank placeholder.
            if ($title === '' && $rangeLabel === '' && $rows === []) {
                continue;
            }

            $result[] = [
                'title' => $title,
                'rangeLabel' => $rangeLabel,
                'rows' => $rows,
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

        // Every configured row is kept as-is, blank or not: the admin controls exactly
        // how many rows a column has, and a blank row still renders as an empty cell
        // (same height as a filled one) rather than being silently removed.
        $result = [];
        foreach (array_values($rows) as $row) {
            if (! is_array($row)) {
                continue;
            }
            /** @var array<string, mixed> $row */
            $label = is_string($row['label'] ?? null) ? trim($row['label']) : '';
            $value = is_string($row['value'] ?? null) ? trim($row['value']) : '';

            $result[] = ['label' => $label, 'value' => $value];
        }

        return $result;
    }
}
