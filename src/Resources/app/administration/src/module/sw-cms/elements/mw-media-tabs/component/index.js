import template from './sw-cms-el-mw-media-tabs.html.twig';
import './sw-cms-el-mw-media-tabs.scss';

const { Mixin } = Shopware;

export default {
    template,
    compatConfig: Shopware.compatConfig,
    mixins: [Mixin.getByName('cms-element')],

    data() {
        return { activeIndex: 0 };
    },

    computed: {
        tabs() {
            return Array.isArray(this.element?.config?.tabs?.value) ? this.element.config.tabs.value : [];
        },

        activeTab() {
            return this.tabs[this.activeIndex] || this.tabs[0] || null;
        },

        wrapperStyle() {
            return {
                backgroundColor: this.element?.config?.backgroundColor?.value || '#f5f4f3',
                '--mw-media-tabs-active': this.element?.config?.activeColor?.value || '#e85630',
            };
        },
    },

    created() {
        this.initElementConfig('mw-media-tabs');
    },

    methods: {
        setActive(index) {
            this.activeIndex = index;
        },

        isVideo(tab) {
            return (tab?.mediaMimeType || '').startsWith('video/') || tab?.mediaType === 'video';
        },
    },
};
