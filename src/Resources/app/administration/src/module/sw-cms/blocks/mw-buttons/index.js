Shopware.Component.register('sw-cms-block-mw-buttons', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-buttons', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-buttons',
    label: 'mw-cms.blocks.mwButtons.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-buttons',
    previewComponent: 'sw-cms-preview-mw-buttons',
    allowedCmsElements: ['mw-buttons'],
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        buttonsSlot: {
            type: 'mw-buttons',
        },
    },
});
