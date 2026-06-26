Shopware.Component.register('sw-cms-block-mw-triple-card', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-triple-card', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-triple-card',
    label: 'mw-cms.blocks.mwTripleCard.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-triple-card',
    previewComponent: 'sw-cms-preview-mw-triple-card',
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        tripleCard: {
            type: 'mw-triple-card',
        },
    },
});
