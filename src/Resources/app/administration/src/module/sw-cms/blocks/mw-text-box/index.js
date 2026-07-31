const BLOCK_NAME = 'mw-text-box';
const ELEMENT_NAME = 'mw-text-box';

Shopware.Component.register('sw-cms-block-mw-text-box', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-text-box-block', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: BLOCK_NAME,
    label: 'mw-cms.blocks.mwTextBox.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-text-box',
    previewComponent: 'sw-cms-preview-mw-text-box-block',
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
