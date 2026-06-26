import template from './sw-cms-el-config-mw-technical-feature-list.html.twig';
import './sw-cms-el-config-mw-technical-feature-list.scss';

const { Mixin } = Shopware;

export default {
    template,
    emits: ['element-update'],
    mixins: [Mixin.getByName('cms-element')],
    inject: ['repositoryFactory'],

    data() {
        return {
            mediaModalIsOpen: false,
            activeIndex: null,
            activeTarget: null,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `mw-technical-feature-list-${this.element.id}`;
        },
    },

    created() {
        this.initElementConfig('mw-technical-feature-list');
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        addBullet() {
            this.element.config.bullets.value.push({
                text: `Feature point ${this.element.config.bullets.value.length + 1}`,
                icon: null,
                iconAlt: `Feature icon ${this.element.config.bullets.value.length + 1}`,
            });
            this.onInput();
        },

        removeBullet(index) {
            this.element.config.bullets.value.splice(index, 1);
            this.onInput();
        },

        addImage() {
            this.element.config.gallery.value.push({
                media: null,
                alt: `Gallery image ${this.element.config.gallery.value.length + 1}`,
            });
            this.onInput();
        },

        removeImage(index) {
            this.element.config.gallery.value.splice(index, 1);
            this.onInput();
        },

        openMediaModal(target, index) {
            this.activeTarget = target;
            this.activeIndex = index;
            this.mediaModalIsOpen = true;
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
            this.activeTarget = null;
            this.activeIndex = null;
        },

        async onSelectionChanges(mediaItems) {
            const media = mediaItems[0];
            if (!media) {
                return;
            }

            if (this.activeTarget === 'bullet') {
                this.element.config.bullets.value[this.activeIndex].icon = media.id;
                this.element.config.bullets.value[this.activeIndex].iconUrl = media.url;
            }

            if (this.activeTarget === 'gallery') {
                this.element.config.gallery.value[this.activeIndex].media = media.id;
                this.element.config.gallery.value[this.activeIndex].mediaUrl = media.url;
            }

            this.onInput();
            this.onCloseModal();
        },
    },
};
