import template from './sw-cms-el-mw-buttons.html.twig';
import './sw-cms-el-mw-buttons.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            svgCache: {}
        };
    },

    computed: {
        buttons() {
            return this.element.config.buttons.value ?? [];
        },

        alignment() {
            return this.element.config.alignment.value ?? 'left';
        }
    },

    created() {
        this.initElementConfig('mw-buttons');

        if (!this.element.config.buttons) {
            this.$set(this.element.config, 'buttons', {
                source: 'static',
                value: [],
            });
        }

        if (!Array.isArray(this.element.config.buttons.value) || this.element.config.buttons.value.length === 0) {
            this.$set(this.element.config.buttons, 'value', [
                {
                    label: 'Button 1',
                    variant: 'solid',
                    textColor: '#ffffff',
                    bgColor: '#ff6600',
                    linkType: 'internal',
                    linkUrl: '',
                    linkNewTab: false,
                    iconId: null,
                    iconUrl: null,
                    iconMimeType: null,
                },
                {
                    label: 'Button 2',
                    variant: 'outline',
                    textColor: '#ff6600',
                    bgColor: 'transparent',
                    linkType: 'internal',
                    linkUrl: '',
                    linkNewTab: false,
                    iconId: null,
                    iconUrl: null,
                    iconMimeType: null,
                }
            ]);
        }
    },

    mounted() {
        this.prefetchSvgs();
    },

    watch: {
        'element.config.buttons.value': {
            deep: true,
            handler() {
                this.prefetchSvgs();
            },
        },
    },

    methods: {
        prefetchSvgs() {
            this.buttons.forEach((btn) => {
                if (btn.iconMimeType === 'image/svg+xml' && btn.iconUrl && !this.svgCache[btn.iconUrl]) {
                    fetch(btn.iconUrl).then((r) => r.text()).then((svg) => {
                        this.svgCache = { ...this.svgCache, [btn.iconUrl]: svg };
                    }).catch(() => { });
                }
            });
        },

        inlineSvg(url) {
            return this.svgCache[url] ?? null;
        },
    },
};
