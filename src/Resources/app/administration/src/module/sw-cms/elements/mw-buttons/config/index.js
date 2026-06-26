import template from './sw-cms-el-config-mw-buttons.html.twig';
import './sw-cms-el-config-mw-buttons.scss';

const { Mixin } = Shopware;

const createButton = () => ({
    label: '',
    variant: 'solid',
    textColor: '#ffffff',
    bgColor: '#ff6600',
    linkType: 'internal',
    linkUrl: '',
    linkNewTab: false,
    iconId: null,
    iconUrl: null,
    iconMimeType: null,
});

export default {
    template,
    emits: ['element-update'],
    inject: ['repositoryFactory'],
    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            mediaModalIndex: null,
            activeButtonIndex: 0,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        buttons() {
            return this.element.config.buttons.value;
        },

        alignmentOptions() {
            return [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
            ];
        },

        variantOptions() {
            return [
                { value: 'solid', label: this.$tc('mw-cms.elements.mwButtons.config.variantSolid') },
                { value: 'outline', label: this.$tc('mw-cms.elements.mwButtons.config.variantOutline') },
            ];
        },

        linkTypeOptions() {
            return [
                { value: 'internal', label: this.$tc('mw-cms.elements.mwButtons.config.linkTypeInternal') },
                { value: 'external', label: this.$tc('mw-cms.elements.mwButtons.config.linkTypeExternal') },
            ];
        },
    },

    created() {
        this.initElementConfig('mw-buttons');

        if (!this.element.config.buttons) {
            this.$set(this.element.config, 'buttons', {
                source: 'static',
                value: [],
            });
        }

        if (!Array.isArray(this.element.config.buttons.value) || this.element.config.buttons.value.length === 0) {
            this.$set(this.element.config.buttons, 'value', [
                {
                    ...createButton(),
                    label: 'Button 1',
                    variant: 'solid',
                    textColor: '#ffffff',
                    bgColor: '#ff6600',
                },
                {
                    ...createButton(),
                    label: 'Button 2',
                    variant: 'outline',
                    textColor: '#ff6600',
                    bgColor: 'transparent',
                }
            ]);
        }

        this.normalizeButtons();
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        normalizeButtons() {
            if (!Array.isArray(this.element.config.buttons.value) || this.element.config.buttons.value.length < 1) {
                this.element.config.buttons.value = [createButton()];
                this.onInput();
            }
        },

        setButtons(buttons) {
            this.element.config.buttons.value = buttons.map((btn) => ({ ...createButton(), ...btn }));
            this.onInput();
        },

        addButton() {
            this.setButtons([...this.buttons, createButton()]);
            this.activeButtonIndex = this.buttons.length - 1;
        },

        removeButton(index) {
            const nextButtons = this.buttons.filter((_, btnIndex) => btnIndex !== index);
            this.setButtons(nextButtons.length ? nextButtons : [createButton()]);
            this.activeButtonIndex = Math.min(this.activeButtonIndex, this.buttons.length - 1);
        },

        openMediaModal(index) {
            this.mediaModalIndex = index;
        },

        async onMediaUpload(index, { targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.updateButton(index, 'iconId', media.id);
            this.updateButton(index, 'iconUrl', media.url);
            this.updateButton(index, 'iconMimeType', media.mimeType);
        },

        async onMediaSelect(index, mediaItems) {
            const media = mediaItems[0];
            this.updateButton(index, 'iconId', media.id);
            this.updateButton(index, 'iconUrl', media.url);
            this.updateButton(index, 'iconMimeType', media.mimeType);
            this.mediaModalIndex = null;
        },

        removeMedia(index) {
            this.updateButton(index, 'iconId', null);
            this.updateButton(index, 'iconUrl', null);
            this.updateButton(index, 'iconMimeType', null);
        },

        updateButton(index, field, value) {
            const nextButtons = this.buttons.map((btn, btnIndex) => (
                btnIndex === index ? { ...btn, [field]: value } : btn
            ));
            this.setButtons(nextButtons);
        },
    },
};
