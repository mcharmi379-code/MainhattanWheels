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

final class MwButtonsCmsElementResolver extends AbstractCmsElementResolver
{
    public function __construct(private readonly string $projectDir)
    {
    }

    public function getType(): string
    {
        return 'mw-buttons';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $mediaIds = $this->collectAllMediaIds($slot);

        if ($mediaIds === []) {
            return null;
        }

        $collection = new CriteriaCollection();
        $collection->add(
            'media_' . $slot->getUniqueIdentifier(),
            MediaDefinition::class,
            new Criteria($mediaIds),
        );

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $mediaCollection = $result->get('media_' . $slot->getUniqueIdentifier());

        $buttons = $config->get('buttons')?->getValue();
        $enriched = [];

        if (is_array($buttons)) {
            foreach ($buttons as $button) {
                if (!is_array($button)) {
                    continue;
                }

                $iconId = $button['iconId'] ?? null;
                $media = (is_string($iconId) && $iconId !== '') ? $mediaCollection?->get($iconId) : null;
                $button['iconUrl'] = $media?->getUrl() ?? ($button['iconUrl'] ?? null);
                $button['iconMimeType'] = $media?->getMimeType() ?? ($button['iconMimeType'] ?? null);
                $button['svgContent'] = null;

                if ($media !== null && $media->getMimeType() === 'image/svg+xml') {
                    $svgContent = $this->loadSvg($media->getPath());
                    if ($svgContent !== null) {
                        $button['svgContent'] = $svgContent;
                    }
                }

                $enriched[] = $button;
            }
        }

        $slot->setData(new ArrayStruct([
            'buttons' => $enriched,
        ]));
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
    private function collectAllMediaIds(CmsSlotEntity $slot): array
    {
        $config = $slot->getFieldConfig();
        $ids = [];

        $buttons = $config->get('buttons')?->getValue();
        if (is_array($buttons)) {
            foreach ($buttons as $button) {
                if (!is_array($button)) {
                    continue;
                }
                $iconId = $button['iconId'] ?? null;
                if (is_string($iconId) && $iconId !== '') {
                    $ids[] = $iconId;
                }
            }
        }

        return array_values(array_unique($ids));
    }
}
