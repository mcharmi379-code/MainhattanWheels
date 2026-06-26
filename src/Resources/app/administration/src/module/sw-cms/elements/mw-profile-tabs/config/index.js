import template from './sw-cms-el-config-mw-profile-tabs.html.twig';
import './sw-cms-el-config-mw-profile-tabs.scss';

const { Mixin } = Shopware;

const createTab = (index = 1) => ({
    title: index === 1 ? 'Vita' : 'Know-How',
    content: index === 1 ? '<p>Describe the first tab content here.</p>' : '<p>Describe the second tab content here.</p>',
});

export default {
    template,
    emits: ['element-update'],
    inject: ['repositoryFactory'],
    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            mediaModalIsOpen: false,
            activeTab: 0,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },
        uploadTag() {
            return `mw-profile-tabs-${this.element.id}`;
        },
        tabs() {
            return this.element.config.tabs.value;
        },
    },

    created() {
        this.initElementConfig('mw-profile-tabs');
        if (!Array.isArray(this.element.config.tabs.value) || this.element.config.tabs.value.length === 0) {
            this.element.config.tabs.value = [createTab(1), createTab(2)];
        }
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },
        addTab() {
            this.element.config.tabs.value = [...this.tabs, createTab(this.tabs.length + 1)];
            this.onInput();
            this.activeTab = this.tabs.length - 1;
        },
        removeTab(index) {
            const next = this.tabs.filter((_, tabIndex) => tabIndex !== index);
            this.element.config.tabs.value = next.length ? next : [createTab(1)];
            this.onInput();
            this.activeTab = Math.max(0, Math.min(this.activeTab, this.tabs.length - 1));
        },
        updateTab(index, field, value) {
            this.element.config.tabs.value = this.tabs.map((tab, tabIndex) => (tabIndex === index ? { ...tab, [field]: value } : tab));
            this.onInput();
        },
        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },
        onCloseModal() {
            this.mediaModalIsOpen = false;
        },
        async onSelectionChanges(mediaItems) {
            const media = mediaItems[0];
            if (!media) return;
            this.element.config.media.value = media.id;
            this.element.data.media = media;
            this.onInput();
            this.onCloseModal();
        },
    },
};
