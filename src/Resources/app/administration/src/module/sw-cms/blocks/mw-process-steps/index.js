Shopware.Component.register('sw-cms-block-mw-process-steps', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-process-steps', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-process-steps',
    label: 'mw-cms.blocks.mwProcessSteps.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-process-steps',
    previewComponent: 'sw-cms-preview-mw-process-steps',
    allowedCmsElements: ['mw-process-steps'],
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        steps: { type: 'mw-process-steps' },
    },
});
