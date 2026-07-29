const BLOCK_NAME = 'mw-cta-banner';
const ELEMENT_NAME = 'mw-cta-banner';

Shopware.Component.register('sw-cms-block-mw-cta-banner', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-cta-banner-block', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: BLOCK_NAME,
    label: 'mw-cms.blocks.mwCtaBanner.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-cta-banner',
    previewComponent: 'sw-cms-preview-mw-cta-banner-block',
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
