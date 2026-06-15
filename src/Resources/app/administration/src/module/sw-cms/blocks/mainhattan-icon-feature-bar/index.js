Shopware.Component.register('sw-cms-block-mainhattan-icon-feature-bar', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mainhattan-icon-feature-bar', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mainhattan-icon-feature-bar',
    label: 'sw-cms.blocks.mainhattanIconFeatureBar.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mainhattan-icon-feature-bar',
    previewComponent: 'sw-cms-preview-mainhattan-icon-feature-bar',
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        iconFeatureBar: {
            type: 'mainhattan-icon-feature-bar',
        },
    },
});
