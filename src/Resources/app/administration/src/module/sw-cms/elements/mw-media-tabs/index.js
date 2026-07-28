const ELEMENT_NAME = 'mw-media-tabs';

const createTab = (index = 1) => ({
    eyebrow: index === 1 ? 'BASE' : '',
    title: index === 1 ? 'OPT2WORK' : `MODULE ${index}`,
    contentTitle: index === 1 ? 'OPT2WORK base module' : `Module ${index}`,
    content: '<p>Add the tab content here.</p>',
    mediaId: null,
    mediaUrl: '',
    mediaMimeType: '',
    mediaType: 'image',
    contentMediaType: 'image',
    contentMediaId: null,
    contentMediaUrl: '',
    contentMediaMimeType: '',
    textColor: '#1f2024',
    backgroundColor: '#ffffff',
});

Shopware.Component.register('sw-cms-el-mw-media-tabs', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-media-tabs', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-media-tabs', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: ELEMENT_NAME,
    label: 'MW Media Tabs',
    component: 'sw-cms-el-mw-media-tabs',
    configComponent: 'sw-cms-el-config-mw-media-tabs',
    previewComponent: 'sw-cms-el-preview-mw-media-tabs',
    defaultConfig: {
        subtitle: { source: 'static', value: 'MODULAR - SCALABLE - NETWORKED' },
        title: { source: 'static', value: 'THE OPT2WORK SOFTWARE FAMILY' },
        description: {
            source: 'static',
            value: 'One base, multiple modules. Combine only what your business needs today, and expand seamlessly later.',
        },
        subtitleColor: { source: 'static', value: '#e35630' },
        titleColor: { source: 'static', value: '#1f2024' },
        descriptionColor: { source: 'static', value: '#6e7480' },
        backgroundColor: { source: 'static', value: '#f5f4f3' },
        activeColor: { source: 'static', value: '#ff6a1a' },
        tabs: { source: 'static', value: [createTab(1), createTab(2), createTab(3)] },
    },
});

export { createTab };
