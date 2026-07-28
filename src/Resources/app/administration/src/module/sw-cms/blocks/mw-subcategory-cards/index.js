Shopware.Component.register('sw-cms-block-mw-subcategory-cards', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-subcategory-cards', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-subcategory-cards',
    label: 'mw-cms.blocks.mwSubcategoryCards.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-subcategory-cards',
    previewComponent: 'sw-cms-preview-mw-subcategory-cards',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        subcategoryCards: 'mw-subcategory-cards',
    },
});
