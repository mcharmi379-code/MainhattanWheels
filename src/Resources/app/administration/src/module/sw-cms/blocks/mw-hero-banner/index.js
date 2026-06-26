Shopware.Component.register('sw-cms-block-mw-hero-banner', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-hero-banner', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-hero-banner',
    label: 'mw-cms.blocks.mwHeroBanner.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-hero-banner',
    previewComponent: 'sw-cms-preview-mw-hero-banner',
    allowedCmsElements: ['mw-hero-banner'],
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        heroBanner: {
            type: 'mw-hero-banner',
        },
    },
});
