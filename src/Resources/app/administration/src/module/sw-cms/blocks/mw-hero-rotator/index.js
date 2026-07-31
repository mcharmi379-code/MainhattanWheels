Shopware.Component.register('sw-cms-block-mw-hero-rotator', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-hero-rotator', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-hero-rotator',
    label: 'mw-cms.blocks.mwHeroRotator.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-hero-rotator',
    previewComponent: 'sw-cms-preview-mw-hero-rotator',
    allowedCmsElements: ['mw-hero-rotator'],
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        heroRotator: {
            type: 'mw-hero-rotator',
        },
    },
});
