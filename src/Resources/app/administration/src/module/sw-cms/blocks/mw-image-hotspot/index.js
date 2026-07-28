Shopware.Component.register('sw-cms-block-mw-image-hotspot', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-image-hotspot', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-image-hotspot',
    label: 'mw-cms.blocks.mwImageHotspot.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-image-hotspot',
    previewComponent: 'sw-cms-preview-mw-image-hotspot',
    allowedCmsElements: ['mw-image-hotspot'],
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        hotspot: { type: 'mw-image-hotspot' },
    },
});
