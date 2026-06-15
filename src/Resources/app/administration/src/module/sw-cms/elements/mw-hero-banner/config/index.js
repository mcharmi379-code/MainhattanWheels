import template from './sw-cms-el-config-mw-hero-banner.html.twig';
import './config.scss';

const { Mixin } = Shopware;

export default {
    template,
    emits: ['element-update'],

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            bgMediaModalIsOpen: false,
            rightMediaModalIsOpen: false,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        bgUploadTag() {
            return `mw-hero-banner-bg-${this.element.id}`;
        },

        rightUploadTag() {
            return `mw-hero-banner-right-${this.element.id}`;
        },

        bgPreviewSource() {
            return this.element?.data?.backgroundMedia?.id
                ? this.element.data.backgroundMedia
                : this.element.config.backgroundMedia.value;
        },

        rightPreviewSource() {
            return this.element?.data?.rightMedia?.id
                ? this.element.data.rightMedia
                : this.element.config.rightMedia.value;
        },
    },

    created() {
        this.initElementConfig('mw-hero-banner');
        this.initElementData('mw-hero-banner');
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        async onBgImageUpload({ targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.element.config.backgroundMedia.value = media.id;
            this.element.config.backgroundMedia.source = 'static';
            this._setData('backgroundMedia', media);
            this.$emit('element-update', this.element);
        },

        onBgImageRemove() {
            this.element.config.backgroundMedia.value = null;
            this._setData('backgroundMedia', null);
            this.$emit('element-update', this.element);
        },

        onBgSelectionChanges(mediaItems) {
            const media = mediaItems[0];
            this.element.config.backgroundMedia.value = media.id;
            this.element.config.backgroundMedia.source = 'static';
            this._setData('backgroundMedia', media);
            this.$emit('element-update', this.element);
        },

        onOpenBgMediaModal() {
            this.bgMediaModalIsOpen = true;
        },

        onCloseBgModal() {
            this.bgMediaModalIsOpen = false;
        },

        async onRightImageUpload({ targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.element.config.rightMedia.value = media.id;
            this.element.config.rightMedia.source = 'static';
            this._setData('rightMedia', media);
            this.$emit('element-update', this.element);
        },

        onRightImageRemove() {
            this.element.config.rightMedia.value = null;
            this._setData('rightMedia', null);
            this.$emit('element-update', this.element);
        },

        onRightSelectionChanges(mediaItems) {
            const media = mediaItems[0];
            this.element.config.rightMedia.value = media.id;
            this.element.config.rightMedia.source = 'static';
            this._setData('rightMedia', media);
            this.$emit('element-update', this.element);
        },

        onOpenRightMediaModal() {
            this.rightMediaModalIsOpen = true;
        },

        onCloseRightModal() {
            this.rightMediaModalIsOpen = false;
        },

        _setData(key, media) {
            const id = media ? media.id : null;
            if (!this.element.data) {
                this.element.data = { [key]: media, [`${key}Id`]: id };
                return;
            }
            this.element.data[key] = media;
            this.element.data[`${key}Id`] = id;
        },
    },
};
