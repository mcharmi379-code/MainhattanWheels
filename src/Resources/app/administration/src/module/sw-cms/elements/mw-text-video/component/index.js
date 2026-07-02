import template from './sw-cms-el-mw-text-video.html.twig';
import './sw-cms-el-mw-text-video.scss';

export default {
    template,

    mixins: [
        Shopware.Mixin.getByName('cms-element'),
    ],

    computed: {
        heading() {
            return this.element?.config?.heading ? this.element.config.heading.value : '';
        },

        headingStyle() {
            const color = this.element?.config?.headingColor ? this.element.config.headingColor.value : '#1a1a1a';
            return `color: ${color};`;
        },

        subHeading() {
            return this.element?.config?.subHeading ? this.element.config.subHeading.value : '';
        },

        subHeadingStyle() {
            const color = this.element?.config?.subHeadingColor ? this.element.config.subHeadingColor.value : '#4a5568';
            return `color: ${color};`;
        },

        buttonText() {
            return this.element?.config?.buttonText ? this.element.config.buttonText.value : '';
        },

        buttonStyle() {
            const bg = this.element?.config?.buttonBgColor ? this.element.config.buttonBgColor.value : '#e06600';
            const text = this.element?.config?.buttonTextColor ? this.element.config.buttonTextColor.value : '#ffffff';
            return `background-color: ${bg}; color: ${text};`;
        },

        mediaUrl() {
            const media = this.element?.data ? this.element.data.mediaFile : null;
            if (media) {
                return media.url;
            }

            if (this.element?.config?.mediaFile && this.element.config.mediaFile.value) {
                return this.element.config.mediaFile.value;
            }

            return null;
        },

        mediaType() {
            return this.element?.config?.mediaType ? this.element.config.mediaType.value : 'image';
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-text-video');
            this.initElementData('mw-text-video');
        },
    },
};
