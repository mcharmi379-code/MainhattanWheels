<?php

declare(strict_types=1);

namespace MainhattanWheels\Core\Content\Cms\DataResolver\Element;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\LandingPage\LandingPageDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\PrefixFilter;
use Shopware\Core\Framework\Struct\ArrayStruct;
use Doctrine\DBAL\Connection;

final class MwPortfolioGalleryCmsElementResolver extends AbstractCmsElementResolver
{
    public function __construct(private readonly Connection $connection)
    {
    }

    public function getType(): string
    {
        return 'mw-portfolio-gallery';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $criteria = new Criteria();
        $criteria->addFilter(new PrefixFilter('translations.url', 'portfolio/'));
        $criteria->addAssociation('translations');
        $criteria->setLimit(500);

        $collection = new CriteriaCollection();
        $collection->add('landingPages_' . $slot->getUniqueIdentifier(), LandingPageDefinition::class, $criteria);

        return $collection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $landingPages = $result->get('landingPages_' . $slot->getUniqueIdentifier());

        $entries = [];
        $cmsPageIds = [];
        if ($landingPages !== null) {
            foreach ($landingPages as $lp) {
                $translations = $lp->getTranslations();
                if ($translations === null || $translations->count() === 0) {
                    continue;
                }

                // Use first available translation
                $translation = $translations->first();
                $url = $translation->getUrl() ?? '';

                if (!str_starts_with($url, 'portfolio/')) {
                    continue;
                }

                $cmsPageId = $lp->getCmsPageId();
                if ($cmsPageId !== null) {
                    $cmsPageIds[] = $cmsPageId;
                }

                $entries[] = [
                    'url'          => $url,
                    'name'         => $translation->getName() ?? '',
                    'customFields' => $translation->get('customFields') ?? [],
                    'cmsPageId'    => $cmsPageId,
                ];
            }
        }

        $firstImageByPageId = $this->fetchFirstImagePaths($cmsPageIds);

        $items = [];
        foreach ($entries as $entry) {
            $customFields = is_array($entry['customFields']) ? $entry['customFields'] : [];
            $images = $customFields['images'] ?? [];
            $images = is_array($images) ? array_values(array_filter($images, 'is_string')) : [];

            $imageUrl = $images[0] ?? null;
            if ($imageUrl === null) {
                $imagePath = $firstImageByPageId[$entry['cmsPageId']] ?? null;
                $imageUrl = $imagePath !== null ? '/media/' . ltrim($imagePath, '/') : null;
            }

            $items[] = new ArrayStruct([
                'url'          => $entry['url'],
                'name'         => $entry['name'],
                'customFields' => $customFields,
                'imageUrl'     => $imageUrl,
                'images'       => $images,
                'detail'       => $customFields['detail'] ?? null,
            ]);
        }

        $slot->setData(new ArrayStruct(['landingPages' => $items]));
    }

    /**
     * @param array<string> $cmsPageIds
     * @return array<string, string> cmsPageId (hex) => media path
     */
    private function fetchFirstImagePaths(array $cmsPageIds): array
    {
        $cmsPageIds = array_values(array_unique($cmsPageIds));
        if ($cmsPageIds === []) {
            return [];
        }

        $rows = $this->connection->fetchAllAssociative(
            'SELECT LOWER(HEX(csec.cms_page_id)) AS cms_page_id, MIN(cb.position) AS min_position, m.path AS media_path
             FROM cms_section csec
             INNER JOIN cms_block cb ON cb.cms_section_id = csec.id AND cb.cms_section_version_id = csec.version_id
             INNER JOIN cms_slot cs ON cs.cms_block_id = cb.id AND cs.cms_block_version_id = cb.version_id AND cs.type = "image"
             INNER JOIN cms_slot_translation cst ON cst.cms_slot_id = cs.id AND cst.cms_slot_version_id = cs.version_id
             INNER JOIN media m ON m.id = UNHEX(JSON_UNQUOTE(JSON_EXTRACT(cst.config, "$.media.value")))
             WHERE csec.cms_page_id IN (' . implode(',', array_fill(0, count($cmsPageIds), 'UNHEX(?)')) . ')
             GROUP BY csec.cms_page_id, m.path
             ORDER BY csec.cms_page_id, MIN(cb.position) ASC',
            $cmsPageIds
        );

        $result = [];
        foreach ($rows as $row) {
            $pageId = $row['cms_page_id'];
            if (!isset($result[$pageId])) {
                $result[$pageId] = $row['media_path'];
            }
        }

        return $result;
    }
}
