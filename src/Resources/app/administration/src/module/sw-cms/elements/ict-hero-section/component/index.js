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
    },

    watch: {
        'element.config.media.value': {
            handler(newVal) {
                if (newVal && (!this.element.data || !this.element.data.media)) {
                    this.fetchMedia(newVal);
                }
            },
            immediate: true,
        },
    },

    created() {
        this.initElementConfig('ict-hero-section');
        this.initElementData('ict-hero-section');
    },

    methods: {
        async fetchMedia(mediaId) {
            try {
                const media = await this.mediaRepository.get(mediaId, Shopware.Context.api);
                if (!this.element.data) {
                    this.element.data = { mediaId: media.id, media };
                } else {
                    this.element.data.media = media;
                    this.element.data.mediaId = media.id;
                }
            } catch (e) {
                // Ignore
            }
        },
    },
};
