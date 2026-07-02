Shopware.Component.register('sw-cms-block-mw-before-after', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-before-after', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-before-after',
    label: 'mw-cms.blocks.mwBeforeAfter.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-before-after',
    previewComponent: 'sw-cms-preview-mw-before-after',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        beforeAfter: {
            type: 'mw-before-after',
        },
    },
});
