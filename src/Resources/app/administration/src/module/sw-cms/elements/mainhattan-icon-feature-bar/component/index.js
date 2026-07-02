import template from './sw-cms-el-mainhattan-icon-feature-bar.html.twig';
import './sw-cms-el-mainhattan-icon-feature-bar.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            svgCache: {},
        };
    },

    computed: {
        items() {
            return this.element.config.items.value ?? [];
        },
    },

    created() {
        this.initElementConfig('mainhattan-icon-feature-bar');
    },

    mounted() {
        this.prefetchSvgs();
    },

    watch: {
        'element.config.items.value': {
            deep: true,
            handler() {
                this.prefetchSvgs();
            },
        },
    },

    methods: {
        prefetchSvgs() {
            this.items.forEach((item) => {
                if (item.iconMimeType === 'image/svg+xml' && item.iconUrl && !this.svgCache[item.iconUrl]) {
                    fetch(item.iconUrl)
                        .then((r) => r.text())
                        .then((svg) => {
                            this.svgCache = { ...this.svgCache, [item.iconUrl]: svg };
                        })
                        .catch(() => { });
                }
            });
        },

        getInlineSvg(item) {
            return this.svgCache[item.iconUrl] ?? null;
        },

        isSvgItem(item) {
            return item.iconMimeType === 'image/svg+xml';
        },
    },
};
