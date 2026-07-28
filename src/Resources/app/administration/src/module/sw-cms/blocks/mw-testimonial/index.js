Shopware.Component.register('sw-cms-block-mw-testimonial', () => import('./component'));
Shopware.Component.register('sw-cms-preview-mw-testimonial', () => import('./preview'));

Shopware.Service('cmsService').registerCmsBlock({
    name: 'mw-testimonial',
    label: 'mw-cms.blocks.mwTestimonial.label',
    category: 'ict-cms-elements',
    component: 'sw-cms-block-mw-testimonial',
    previewComponent: 'sw-cms-preview-mw-testimonial',
    allowedCmsElements: ['mw-testimonial'],
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed',
    },
    slots: {
        testimonial: { type: 'mw-testimonial' },
    },
});
