const BLOCK_NAME = 'mw-technical-feature-list';
const ELEMENT_NAME = 'mw-technical-feature-list';
const BLOCK_CATEGORY = 'ict-cms-elements';

Shopware.Component.register('sw-cms-block-mw-technical-feature-list', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-technical-feature-list', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: BLOCK_NAME,
    label: 'mw-cms.blocks.mwTechnicalFeatureList.label',
    category: BLOCK_CATEGORY,
    component: 'sw-cms-block-mw-technical-feature-list',
    previewComponent: 'sw-cms-preview-mw-technical-feature-list',
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
