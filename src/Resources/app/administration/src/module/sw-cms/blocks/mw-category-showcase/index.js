import preview from './preview';
import component from './component';

Shopware.Component.register('sw-cms-preview-mw-category-showcase', preview);
Shopware.Component.register('sw-cms-block-mw-category-showcase', component);

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-category-showcase',
    label: 'mw-cms.blocks.mwCategoryShowcase.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-category-showcase',
    previewComponent: 'sw-cms-preview-mw-category-showcase',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full_width',
    },
    slots: {
        showcase: 'mw-category-showcase',
    },
});
