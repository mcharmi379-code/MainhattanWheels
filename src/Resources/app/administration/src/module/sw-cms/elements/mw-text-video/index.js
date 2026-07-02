Shopware.Component.register('sw-cms-el-mw-text-video', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-text-video', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-text-video', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-text-video',
    label: 'mw-cms.elements.mwTextVideo.label',
    component: 'sw-cms-el-mw-text-video',
    configComponent: 'sw-cms-el-config-mw-text-video',
    previewComponent: 'sw-cms-el-preview-mw-text-video',
    defaultConfig: {
        heading: {
            source: 'static',
            value: 'Would you like a demonstration?',
        },
        headingColor: {
            source: 'static',
            value: '#1a1a1a',
        },
        subHeading: {
            source: 'static',
            value: 'Compare our CNC solution with other solutions on the market. We would be happy to demonstrate in detail...',
        },
        subHeadingColor: {
            source: 'static',
            value: '#4a5568',
        },
        buttonText: {
            source: 'static',
            value: 'Call 06074 - 48 66 5 66',
        },
        buttonBgColor: {
            source: 'static',
            value: '#e06600',
        },
        buttonTextColor: {
            source: 'static',
            value: '#ffffff',
        },
        buttonLinkType: {
            source: 'static',
            value: 'external',
        },
        buttonLinkTarget: {
            source: 'static',
            value: '_self',
        },
        buttonLink: {
            source: 'static',
            value: '',
        },
        mediaType: {
            source: 'static',
            value: 'image',
        },
        mediaFile: {
            source: 'static',
            value: null,
            required: true,
            entity: {
                name: 'media',
            },
        },
        mediaLink: {
            source: 'static',
            value: '',
        },
        mediaLinkTarget: {
            source: 'static',
            value: '_blank',
        }
    }
});
