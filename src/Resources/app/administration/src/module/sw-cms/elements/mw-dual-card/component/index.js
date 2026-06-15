import template from './sw-cms-el-mw-dual-card.html.twig';
import './sw-cms-el-mw-dual-card.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [Mixin.getByName('cms-element')],

    data() {
        return { svgCache: {} };
    },

    computed: {
        c() {
            return this.element.config;
        },

        rightFeatures() {
            return this.c.rightFeatures.value ?? [];
        },
    },

    created() {
        this.initElementConfig('mw-dual-card');
    },

    mounted() {
        this.prefetchSvgs();
    },

    watch: {
        'element.config.rightFeatures.value': {
            deep: true,
            handler() { this.prefetchSvgs(); },
        },
    },

    methods: {
        prefetchSvgs() {
            this.rightFeatures.forEach((f) => {
                if (f.iconMimeType === 'image/svg+xml' && f.iconUrl && !this.svgCache[f.iconUrl]) {
                    fetch(f.iconUrl).then((r) => r.text()).then((svg) => {
                        this.svgCache = { ...this.svgCache, [f.iconUrl]: svg };
                    }).catch(() => {});
                }
            });
        },

        inlineSvg(url) {
            return this.svgCache[url] ?? null;
        },
    },
};
