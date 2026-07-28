Shopware.Component.register('sw-cms-block-mw-tab-cards', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-tab-cards', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-tab-cards',
    label: 'mw-cms.blocks.mwTabCards.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-tab-cards',
    previewComponent: 'sw-cms-preview-mw-tab-cards',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        tabCards: 'mw-tab-cards',
    },
});
