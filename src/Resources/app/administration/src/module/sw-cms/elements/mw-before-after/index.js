Shopware.Component.register('sw-cms-el-mw-before-after', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-before-after', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-before-after', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-before-after',
    label: 'mw-cms.elements.mwBeforeAfter.label',
    component: 'sw-cms-el-mw-before-after',
    configComponent: 'sw-cms-el-config-mw-before-after',
    previewComponent: 'sw-cms-el-preview-mw-before-after',
    defaultConfig: {
        columns: {
            source: 'static',
            value: 3,
        },
        items: {
            source: 'static',
            value: [
                {
                    heading: 'Rim repair',
                    headingColor: '#e06600',
                    subHeading: 'CNC diamond turning with acrylic coating, glossy',
                    beforeImage: null,
                    beforeImageUrl: null,
                    beforeText: 'Before: A Bentley wheel rim damaged at the rim edge. The damaged area is to be machined to a greater degree than the rest of the diamond-cut area of the rim.',
                    beforeTextColor: '#e06600',
                    afterImage: null,
                    afterImageUrl: null,
                    afterText: 'Afterwards: Only in the area of damage was 0.5 mm of material removed, in the remaining area only 0.1 mm.',
                    afterTextColor: '#e06600',
                },
                {
                    heading: 'Rim finishing',
                    headingColor: '#e06600',
                    subHeading: 'CNC diamond turning with matte acrylic coating',
                    beforeImage: null,
                    beforeImageUrl: null,
                    beforeText: 'Before: A Porsche 911 GTS rim is given the look of the 911 Turbo S surface finish through CNC diamond turning. No problem for our CNC-MW28H CNC machine!',
                    beforeTextColor: '#e06600',
                    afterImage: null,
                    afterImageUrl: null,
                    afterText: 'Afterwards: The Porsche GTS rim is CNC diamond-turned on the top side and then coated with matt acrylic.',
                    afterTextColor: '#e06600',
                },
                {
                    heading: 'Rim manufacturing',
                    headingColor: '#e06600',
                    subHeading: 'CNC machines, rims, diamond turning, rim manufacturing',
                    beforeImage: null,
                    beforeImageUrl: null,
                    beforeText: 'Previously: Our systems are not only used for processing our own wheel designs, but numerous other manufacturers also rely on systems from Mainhattan Wheels.',
                    beforeTextColor: '#e06600',
                    afterImage: null,
                    afterImageUrl: null,
                    afterText: 'Afterwards: The CNC-MW28H is used, for example, by the manufacturer "etabeta" in rim production.',
                    afterTextColor: '#e06600',
                }
            ],
        },
    },
});
