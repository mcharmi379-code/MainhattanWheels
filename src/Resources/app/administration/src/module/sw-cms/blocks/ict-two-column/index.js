const BLOCK_NAME = 'ict-two-column';
const ELEMENT_NAME = 'ict-two-column';
const BLOCK_CATEGORY = 'ict-cms-elements';

Shopware.Component.register('sw-cms-block-ict-two-column', () => import('./component'));
Shopware.Component.register('sw-cms-preview-ict-two-column', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: BLOCK_NAME,
    label: 'mw-cms.blocks.ictTwoColumnLayout.label',
    category: BLOCK_CATEGORY,
    component: 'sw-cms-block-ict-two-column',
    previewComponent: 'sw-cms-preview-ict-two-column',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        left: { type: ELEMENT_NAME },
        right: { type: ELEMENT_NAME },
    },
});
