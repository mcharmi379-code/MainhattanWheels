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

final class MwFileDownloadCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'mw-file-download';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        $collection = new CriteriaCollection();
        $uid = $slot->getUniqueIdentifier();

        foreach (['downloadFileId' => 'mw_file_download_file_', 'downloadPreviewImageId' => 'mw_file_download_download_preview_', 'ctaPreviewImageId' => 'mw_file_download_cta_preview_'] as $key => $prefix) {
            $value = $config->get($key)?->getValue();
            if (\is_string($value) && $value !== '') {
                $collection->add($prefix . $uid, MediaDefinition::class, new Criteria([$value]));
            }
        }

        return $collection->all() !== [] ? $collection : null;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $uid = $slot->getUniqueIdentifier();

        $downloadFileId = $config->get('downloadFileId')?->getStringValue() ?? '';
        $downloadPreviewImageId = $config->get('downloadPreviewImageId')?->getStringValue() ?? '';
        $ctaPreviewImageId = $config->get('ctaPreviewImageId')?->getStringValue() ?? '';

        $file = $downloadFileId !== '' ? $result->get('mw_file_download_file_' . $uid)?->get($downloadFileId) : null;
        $downloadPreview = $downloadPreviewImageId !== '' ? $result->get('mw_file_download_download_preview_' . $uid)?->get($downloadPreviewImageId) : null;
        $ctaPreview = $ctaPreviewImageId !== '' ? $result->get('mw_file_download_cta_preview_' . $uid)?->get($ctaPreviewImageId) : null;

        $slot->setData(new ArrayStruct([
            'downloadTitle' => $config->get('downloadTitle')?->getStringValue() ?? '',
            'downloadSubtitle' => $config->get('downloadSubtitle')?->getStringValue() ?? '',
            'downloadButtonText' => $config->get('downloadButtonText')?->getStringValue() ?? '',
            'downloadFileId' => $config->get('downloadFileId')?->getStringValue() ?? '',
            'downloadPreviewImageId' => $config->get('downloadPreviewImageId')?->getStringValue() ?? '',
            'ctaTitle' => $config->get('ctaTitle')?->getStringValue() ?? '',
            'ctaSubtitle' => $config->get('ctaSubtitle')?->getStringValue() ?? '',
            'ctaButtonText' => $config->get('ctaButtonText')?->getStringValue() ?? '',
            'ctaButtonUrl' => $config->get('ctaButtonUrl')?->getStringValue() ?? '',
            'ctaPreviewImageId' => $config->get('ctaPreviewImageId')?->getStringValue() ?? '',
            'downloadFile' => $file,
            'downloadFileUrl' => $file?->getUrl(),
            'downloadPreviewImage' => $downloadPreview,
            'downloadPreviewImageUrl' => $downloadPreview?->getUrl(),
            'ctaPreviewImage' => $ctaPreview,
            'ctaPreviewImageUrl' => $ctaPreview?->getUrl(),
        ]));
    }
}
