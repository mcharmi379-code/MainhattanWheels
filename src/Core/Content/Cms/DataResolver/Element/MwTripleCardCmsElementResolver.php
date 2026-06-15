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

final class MwTripleCardCmsElementResolver extends AbstractCmsElementResolver
{
    public function __construct(private readonly string $projectDir)
    {
    }

    public function getType(): string
    {
        return 'mw-triple-card';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $ids = $this->collectMediaIds($slot);

        if ($ids === []) {
            return null;
        }

        $collection = new CriteriaCollection();
        $collection->add(
            'media_' . $slot->getUniqueIdentifier(),
            MediaDefinition::class,
            new Criteria($ids),
        );

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $mediaCollection = $result->get('media_' . $slot->getUniqueIdentifier());

        $data = [];

        // Left card: multiple icons
        $leftIcons = $config->get('leftIcons')?->getValue();
        $enrichedLeftIcons = [];
        if (is_array($leftIcons)) {
            foreach ($leftIcons as $item) {
                if (!is_array($item)) {
                    continue;
                }
                $iconId = $item['iconId'] ?? null;
                $iconMedia = (is_string($iconId) && $iconId !== '') ? $mediaCollection?->get($iconId) : null;
                $item['iconUrl'] = $iconMedia?->getUrl() ?? ($item['iconUrl'] ?? null);
                $item['svgContent'] = null;
                if ($iconMedia !== null && $iconMedia->getMimeType() === 'image/svg+xml') {
                    $item['svgContent'] = $this->loadSvg($iconMedia->getPath());
                }
                $enrichedLeftIcons[] = $item;
            }
        }
        $data['leftIcons'] = $enrichedLeftIcons;

        // Left bg image
        $leftBgId = $config->get('leftBgMediaId')?->getValue();
        $leftBgMedia = (is_string($leftBgId) && $leftBgId !== '') ? $mediaCollection?->get($leftBgId) : null;
        $data['leftBgMediaUrl'] = $leftBgMedia?->getUrl() ?? ($config->get('leftBgMediaUrl')?->getValue() ?? null);

        // Middle bg image
        $midBgId = $config->get('midBgMediaId')?->getValue();
        $midBgMedia = (is_string($midBgId) && $midBgId !== '') ? $mediaCollection?->get($midBgId) : null;
        $data['midBgMediaUrl'] = $midBgMedia?->getUrl() ?? ($config->get('midBgMediaUrl')?->getValue() ?? null);

        // Middle after-button icon
        $midIconId = $config->get('midIconId')?->getValue();
        $midIconMedia = (is_string($midIconId) && $midIconId !== '') ? $mediaCollection?->get($midIconId) : null;
        $data['midIconUrl'] = $midIconMedia?->getUrl() ?? ($config->get('midIconUrl')?->getValue() ?? null);
        $data['midIconSvg'] = ($midIconMedia?->getMimeType() === 'image/svg+xml')
            ? $this->loadSvg($midIconMedia->getPath())
            : null;

        // Right bg image
        $rightBgId = $config->get('rightBgMediaId')?->getValue();
        $rightBgMedia = (is_string($rightBgId) && $rightBgId !== '') ? $mediaCollection?->get($rightBgId) : null;
        $data['rightBgMediaUrl'] = $rightBgMedia?->getUrl() ?? ($config->get('rightBgMediaUrl')?->getValue() ?? null);

        // Right icon
        $rightIconId = $config->get('rightIconId')?->getValue();
        $rightIconMedia = (is_string($rightIconId) && $rightIconId !== '') ? $mediaCollection?->get($rightIconId) : null;
        $data['rightIconUrl'] = $rightIconMedia?->getUrl() ?? ($config->get('rightIconUrl')?->getValue() ?? null);
        $data['rightIconSvg'] = ($rightIconMedia?->getMimeType() === 'image/svg+xml')
            ? $this->loadSvg($rightIconMedia->getPath())
            : null;

        $slot->setData(new ArrayStruct($data));
    }

    private function loadSvg(string $path): ?string
    {
        $filePath = $this->projectDir . '/public/media/' . $path;

        if (!is_file($filePath)) {
            return null;
        }

        $svg = file_get_contents($filePath);

        if ($svg === false) {
            return null;
        }

        $svg = preg_replace('/<\?xml[^?]*\?>/', '', $svg) ?? $svg;
        $svg = preg_replace('/<svg\s/', '<svg fill="currentColor" ', $svg, 1) ?? $svg;
        $svg = preg_replace('/\s(width|height)="[^"]*"/', '', $svg) ?? $svg;

        return trim($svg);
    }

    /**
     * @return list<string>
     */
    private function collectMediaIds(CmsSlotEntity $slot): array
    {
        $config = $slot->getFieldConfig();
        $ids = [];

        foreach (['leftBgMediaId', 'midBgMediaId', 'midIconId', 'rightBgMediaId', 'rightIconId'] as $key) {
            $value = $config->get($key)?->getValue();
            if (is_string($value) && $value !== '') {
                $ids[] = $value;
            }
        }

        $leftIcons = $config->get('leftIcons')?->getValue();
        if (is_array($leftIcons)) {
            foreach ($leftIcons as $item) {
                if (!is_array($item)) {
                    continue;
                }
                $iconId = $item['iconId'] ?? null;
                if (is_string($iconId) && $iconId !== '') {
                    $ids[] = $iconId;
                }
            }
        }

        return array_values(array_unique($ids));
    }
}
