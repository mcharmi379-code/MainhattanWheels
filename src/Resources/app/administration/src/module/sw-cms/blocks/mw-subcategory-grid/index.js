const BLOCK_NAME = 'mw-subcategory-grid';
const ELEMENT_NAME = 'mw-subcategory-grid';

Shopware.Component.register('sw-cms-block-mw-subcategory-grid', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-subcategory-grid-block', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: BLOCK_NAME,
    label: 'mw-cms.blocks.mwSubcategoryGrid.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-subcategory-grid',
    previewComponent: 'sw-cms-preview-mw-subcategory-grid-block',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        content: {
            type: ELEMENT_NAME,
        },
    },
});
