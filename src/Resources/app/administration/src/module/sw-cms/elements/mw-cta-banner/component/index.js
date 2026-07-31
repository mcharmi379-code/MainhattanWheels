import template from './sw-cms-el-mw-cta-banner.html.twig';
import './sw-cms-el-mw-cta-banner.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        iconMediaId() {
            return this.element.config.iconMediaId.value ?? null;
        },

        contentOrder() {
            return this.element.config.contentOrder.value ?? 'text-button';
        },

        text() {
            return this.element.config.text.value ?? '';
        },

        textColor() {
            return this.element.config.textColor.value ?? '#1f2937';
        },

        bannerBgColor() {
            return this.element.config.bannerBgColor.value ?? '#f4f4f4';
        },

        buttonLabel() {
            return this.element.config.buttonLabel.value ?? '';
        },

        buttonBgColor() {
            return this.element.config.buttonBgColor.value ?? '#1f2937';
        },

        buttonTextColor() {
            return this.element.config.buttonTextColor.value ?? '#ffffff';
        },
    },

    created() {
        this.initElementConfig('mw-cta-banner');
    },
};
