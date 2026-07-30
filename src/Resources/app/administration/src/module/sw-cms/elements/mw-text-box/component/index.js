import template from './sw-cms-el-mw-text-box.html.twig';
import './sw-cms-el-mw-text-box.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        text() {
            return this.element.config.text.value ?? '';
        },

        bgColor() {
            return this.element.config.bgColor.value ?? '#f4f4f4';
        },

        textColor() {
            return this.element.config.textColor.value ?? '#1f2937';
        },

        hoverBgColor() {
            return this.element.config.hoverBgColor.value ?? '#1f2937';
        },

        hoverTextColor() {
            return this.element.config.hoverTextColor.value ?? '#ffffff';
        },

        elementStyles() {
            return {
                '--mw-text-box-bg-color': this.bgColor,
                '--mw-text-box-text-color': this.textColor,
                '--mw-text-box-hover-bg-color': this.hoverBgColor,
                '--mw-text-box-hover-text-color': this.hoverTextColor,
            };
        },
    },

    created() {
        this.initElementConfig('mw-text-box');
    },
};
