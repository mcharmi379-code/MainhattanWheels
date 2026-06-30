const ELEMENT_NAME = 'mw-subcategory-grid';

Shopware.Component.register('sw-cms-el-preview-mw-subcategory-grid', () => import('./preview'));
Shopware.Component.register('sw-cms-el-mw-subcategory-grid', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-subcategory-grid', () => import('./config'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'mw-cms.elements.mwSubcategoryGrid.label',
    component: 'sw-cms-el-mw-subcategory-grid',
    configComponent: 'sw-cms-el-config-mw-subcategory-grid',
    previewComponent: 'sw-cms-el-preview-mw-subcategory-grid',
    defaultConfig: {
        title: { source: 'static', value: 'Weitere Anlagen für die Felgenbearbeitung' },
        categoryId: { source: 'static', value: null, required: false },
    },
    defaultData: {
        category: null,
        subCategories: [],
    },
});
