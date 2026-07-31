import template from './sw-cms-el-mw-hero-rotator.html.twig';
import './sw-cms-el-mw-hero-rotator.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    created() {
        this.createdComponent();
    },

    computed: {
        backgroundColor() {
            return this.element.config.backgroundColor.value;
        },

        titleText() {
            return this.element.config.titleText.value;
        },

        titleColor() {
            return this.element.config.titleColor.value;
        },

        transformTextColor() {
            return this.element.config.transformTextColor.value;
        },

        lineCount() {
            return this.element.config.lineCount.value;
        },

        lines() {
            const lines = [];
            for (let i = 1; i <= this.lineCount; i += 1) {
                const value = this.element.config[`transformText${i}`]?.value;
                if (value) {
                    lines.push(value);
                }
            }
            return lines;
        },
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-hero-rotator');
        },
    },
};
