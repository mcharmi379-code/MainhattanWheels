Shopware.Component.register('sw-cms-block-mw-dual-card', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-dual-card', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-dual-card',
    label: 'mw-cms.blocks.mwDualCard.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-dual-card',
    previewComponent: 'sw-cms-preview-mw-dual-card',
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        dualCard: {
            type: 'mw-dual-card',
        },
    },
});
