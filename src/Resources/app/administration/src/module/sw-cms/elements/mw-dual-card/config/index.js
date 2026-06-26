import template from './sw-cms-el-config-mw-dual-card.html.twig';
import './sw-cms-el-config-mw-dual-card.scss';

const { Mixin } = Shopware;

export default {
    template,

    emits: ['element-update'],

    inject: ['repositoryFactory'],

    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            activeFeatureIndex: 0,
            featureMediaModalOpen: false,
            rightBgMediaModalOpen: false,
        };
    },

    computed: {
        linkTypeOptions() {
            return [
                { value: 'external', label: 'External' },
                { value: 'internal', label: 'Internal' },
            ];
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        c() {
            return this.element.config;
        },

        rightFeatures() {
            return this.c.rightFeatures.value ?? [];
        },

        activeFeature() {
            return this.rightFeatures[this.activeFeatureIndex] ?? null;
        },

        featureUploadTag() {
            return `mw-dual-card-feature-${this.element.id}-${this.activeFeatureIndex}`;
        },

        rightBgUploadTag() {
            return `mw-dual-card-rightbg-${this.element.id}`;
        },

        isFeatureSvg() {
            return this.activeFeature?.iconMimeType === 'image/svg+xml';
        },
    },

    created() {
        this.initElementConfig('mw-dual-card');
        if (!Array.isArray(this.c.rightFeatures.value)) {
            this.c.rightFeatures.value = [{ text: '', iconId: null, iconUrl: null, iconMimeType: null, svgColor: '' }];
        }
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        addFeature() {
            this.c.rightFeatures.value.push({ text: '', iconId: null, iconUrl: null, iconMimeType: null, svgColor: '' });
            this.activeFeatureIndex = this.rightFeatures.length - 1;
            this.onInput();
        },

        removeFeature(index) {
            this.c.rightFeatures.value.splice(index, 1);
            if (this.activeFeatureIndex >= this.rightFeatures.length) {
                this.activeFeatureIndex = Math.max(0, this.rightFeatures.length - 1);
            }
            this.onInput();
        },

        updateFeature(field, value) {
            if (!this.activeFeature) return;
            this.c.rightFeatures.value[this.activeFeatureIndex][field] = value;
            this.onInput();
        },

        onLeftLinkTypeChange() {
            this.c.leftLinkUrl.value = '';
            this.onInput();
        },

        onRightLinkTypeChange() {
            this.c.rightLinkUrl.value = '';
            this.onInput();
        },

        async onFeatureIconUpload({ targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.c.rightFeatures.value[this.activeFeatureIndex].iconId = media.id;
            this.c.rightFeatures.value[this.activeFeatureIndex].iconUrl = media.url;
            this.c.rightFeatures.value[this.activeFeatureIndex].iconMimeType = media.mimeType;
            this.onInput();
        },

        onFeatureIconRemove() {
            this.c.rightFeatures.value[this.activeFeatureIndex].iconId = null;
            this.c.rightFeatures.value[this.activeFeatureIndex].iconUrl = null;
            this.c.rightFeatures.value[this.activeFeatureIndex].iconMimeType = null;
            this.onInput();
        },

        onFeatureMediaSelect(mediaItems) {
            const media = mediaItems[0];
            this.c.rightFeatures.value[this.activeFeatureIndex].iconId = media.id;
            this.c.rightFeatures.value[this.activeFeatureIndex].iconUrl = media.url;
            this.c.rightFeatures.value[this.activeFeatureIndex].iconMimeType = media.mimeType;
            this.featureMediaModalOpen = false;
            this.onInput();
        },

        async onRightBgUpload({ targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.c.rightBgMediaId.value = media.id;
            this.c.rightBgMediaUrl.value = media.url;
            this.onInput();
        },

        onRightBgRemove() {
            this.c.rightBgMediaId.value = null;
            this.c.rightBgMediaUrl.value = null;
            this.onInput();
        },

        onRightBgMediaSelect(mediaItems) {
            const media = mediaItems[0];
            this.c.rightBgMediaId.value = media.id;
            this.c.rightBgMediaUrl.value = media.url;
            this.rightBgMediaModalOpen = false;
            this.onInput();
        },
    },
};
