const BLOCK_NAME = 'mw-load-capacity-table';
const ELEMENT_NAME = 'mw-load-capacity-table';
const BLOCK_CATEGORY = 'ict-cms-elements';

Shopware.Component.register('sw-cms-block-mw-load-capacity-table', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-load-capacity-table', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: BLOCK_NAME,
    label: 'mw-cms.blocks.mwLoadCapacityTable.label',
    category: BLOCK_CATEGORY,
    component: 'sw-cms-block-mw-load-capacity-table',
    previewComponent: 'sw-cms-preview-mw-load-capacity-table',
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
