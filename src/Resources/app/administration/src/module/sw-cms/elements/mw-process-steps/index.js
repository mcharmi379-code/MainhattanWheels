Shopware.Component.register('sw-cms-el-mw-process-steps', () => import('./component'));
Shopware.Component.register('sw-cms-el-config-mw-process-steps', () => import('./config'));
Shopware.Component.register('sw-cms-el-preview-mw-process-steps', () => import('./preview'));

Shopware.Service('cmsService').registerCmsElement({
    name: 'mw-process-steps',
    label: 'mw-cms.elements.mwProcessSteps.label',
    component: 'sw-cms-el-mw-process-steps',
    configComponent: 'sw-cms-el-config-mw-process-steps',
    previewComponent: 'sw-cms-el-preview-mw-process-steps',
    defaultConfig: {
        heading: {
            source: 'static',
            value: 'Reproduktion des Herstellungsprozesses von pulverbeschichteten Felgen garantiert neuwertige Oberflächenergebnisse',
        },
        subheading: {
            source: 'static',
            value: 'Bei der Herstellung von Felgen werden Nasslackierung und Pulverbeschichtung oftmals kombiniert',
        },
        accentColor: {
            source: 'static',
            value: '#e85630',
        },
        stepCount: {
            source: 'static',
            value: 4,
        },
        step1Title: { source: 'static', value: 'Felgen-rohling oder entlackte Gebrauchtfelge' },
        step1SubTitle: { source: 'static', value: '' },
        step1Desc: { source: 'static', value: 'Der Felgenrohling oder die Gebrauchtfelge wurden phosphatiert bzw. gestrahlt um zu gewährleisten, dass die Oberfläche fettfrei bzw. genug Haftung bietet.' },
        step2Title: { source: 'static', value: 'Pulverlack-grundierung' },
        step2SubTitle: { source: 'static', value: '' },
        step2Desc: { source: 'static', value: 'Eine Grundierung ist eine Schicht, die der Haftvermittlung zwischen Felgenoberfläche und Beschichtung dient und zugleich Fülleigenschaften aufweist.' },
        step3Title: { source: 'static', value: 'Farbgebende Pulver-beschichtung oder Nasslackierung' },
        step3SubTitle: { source: 'static', value: '' },
        step3Desc: { source: 'static', value: 'Auf die grundierte Oberfläche kann nun entweder direkt ein Nasslack oder Pulverlack appliziert werden.' },
        step4Title: { source: 'static', value: 'Klar-beschichtung mit Acrylpulverlack' },
        step4SubTitle: { source: 'static', value: '' },
        step4Desc: { source: 'static', value: 'Acryl-Pulverlacke zeichnen sich durch brillanten Glanz, hohe Transparenz und hervorragenden Verlauf bei Einbrennbedingungen ab 140 °C aus.' },
        step5Title: { source: 'static', value: '' },
        step5SubTitle: { source: 'static', value: '' },
        step5Desc: { source: 'static', value: '' },
        step6Title: { source: 'static', value: '' },
        step6SubTitle: { source: 'static', value: '' },
        step6Desc: { source: 'static', value: '' },
    },
});
