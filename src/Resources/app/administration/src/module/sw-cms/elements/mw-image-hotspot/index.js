Shopware.Component.register('sw-cms-el-mw-image-hotspot', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-image-hotspot', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-image-hotspot', () => import('./preview'));

const defaultConfig = {
    tabCount: {
        source: 'static',
        value: 3,
    },
    tooltipBgColor: {
        source: 'static',
        value: '#1f2937',
    },
    tooltipTextColor: {
        source: 'static',
        value: '#ffffff',
    },
};

// Generate default config keys dynamically for 8 tabs, each with 5 hotspots
for (let t = 1; t <= 8; t++) {
    defaultConfig[`tab${t}Title`] = { source: 'static', value: `Tab ${t}` };
    defaultConfig[`tab${t}IconId`] = { source: 'static', value: null };
    defaultConfig[`tab${t}MediaId`] = { source: 'static', value: null };
    defaultConfig[`tab${t}HotspotCount`] = { source: 'static', value: 3 };

    for (let h = 1; h <= 5; h++) {
        defaultConfig[`tab${t}Hotspot${h}Top`] = { source: 'static', value: 50.0 };
        defaultConfig[`tab${t}Hotspot${h}Left`] = { source: 'static', value: 50.0 };
        defaultConfig[`tab${t}Hotspot${h}Title`] = { source: 'static', value: '' };
        defaultConfig[`tab${t}Hotspot${h}Text`] = { source: 'static', value: '' };
    }

    // Optional additional dynamic content elements (e.g. text, image, or any other CMS element)
    defaultConfig[`tab${t}DynamicCount`] = { source: 'static', value: 0 };
    for (let d = 1; d <= 5; d++) {
        defaultConfig[`tab${t}Dynamic${d}Type`] = { source: 'static', value: null };
        defaultConfig[`tab${t}Dynamic${d}Config`] = { source: 'static', value: '{}' };
    }
}

// Set up specific defaults matching the reference images
defaultConfig.tab1Title.value = 'BASISPAKET OFENWAGEN';
defaultConfig.tab2Title.value = 'ERWEITERUNG MONORAIL';
defaultConfig.tab3Title.value = 'BEISPIEL KUNDENANLAGE';

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-image-hotspot',
    label: 'mw-cms.elements.mwImageHotspot.label',
    component: 'sw-cms-el-mw-image-hotspot',
    configComponent: 'sw-cms-el-config-mw-image-hotspot',
    previewComponent: 'sw-cms-el-preview-mw-image-hotspot',
    defaultConfig: defaultConfig,
});
