Shopware.Component.register('sw-cms-el-mw-testimonial', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-testimonial', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-testimonial', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-testimonial',
    label: 'mw-cms.elements.mwTestimonial.label',
    component: 'sw-cms-el-mw-testimonial',
    configComponent: 'sw-cms-el-config-mw-testimonial',
    previewComponent: 'sw-cms-el-preview-mw-testimonial',
    defaultConfig: {
        imageId: {
            source: 'static',
            value: null,
        },
        quote: {
            source: 'static',
            value: '',
        },
        authorName: {
            source: 'static',
            value: '',
        },
        authorRole: {
            source: 'static',
            value: '',
        },
    },
});
