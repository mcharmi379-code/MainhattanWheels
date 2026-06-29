import template from './sw-cms-el-ict-hero-section.html.twig';
import './sw-cms-el-ict-hero-section.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    inject: ['repositoryFactory'],

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        labelStyle() {
            const styles = {};

            if (this.element.config.labelBackgroundColor.value) {
                styles.backgroundColor = this.element.config.labelBackgroundColor.value;
            }

            if (this.element.config.labelTextColor.value) {
                styles.color = this.element.config.labelTextColor.value;
            }

            if (this.element.config.labelBorderColor.value) {
                styles.borderColor = this.element.config.labelBorderColor.value;
            }

            return styles;
        },

        textAlignmentClass() {
            const align = this.element?.config?.textAlignment?.value || 'left';
            return `align-${align}`;
        },
    },

    watch: {
        'element.config.backgroundMedia.value': {
            handler(newVal) {
                if (newVal && (!this.element.data || !this.element.data.backgroundMedia)) {
                    this.fetchMedia(newVal, 'backgroundMedia');
                }
            },
            immediate: true,
        },
        'element.config.backgroundVideo.value': {
            handler(newVal) {
                if (newVal && (!this.element.data || !this.element.data.video)) {
                    this.fetchMedia(newVal, 'video');
                }
            },
            immediate: true,
        },
    },

    created() {
        this.initElementConfig('ict-hero-section');
        this.initElementData('ict-hero-section');
        if (this.element && this.element.config) {
            if (!this.element.config.textAlignment) {
                this.element.config.textAlignment = {
                    source: 'static',
                    value: 'left',
                };
            }
            if (!this.element.config.backgroundVideo) {
                this.element.config.backgroundVideo = {
                    source: 'static',
                    value: null,
                };
            }
        }
    },

    methods: {
        async fetchMedia(mediaId, type = 'backgroundMedia') {
            try {
                const media = await this.mediaRepository.get(mediaId, Shopware.Context.api);
                if (!this.element.data) {
                    this.element.data = {};
                }
                if (type === 'video') {
                    this.element.data.video = media;
                    this.element.data.backgroundVideoId = media.id;
                } else {
                    this.element.data.backgroundMedia = media;
                    this.element.data.backgroundMediaId = media.id;
                }
            } catch (e) {
                // Ignore
            }
        },
    },
};
