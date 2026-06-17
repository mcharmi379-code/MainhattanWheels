import template from './sw-cms-el-config-mw-triple-card.html.twig';
import './sw-cms-el-config-mw-triple-card.scss';

const { Mixin } = Shopware;

export default {
    template,

    emits: ['element-update'],

    inject: ['repositoryFactory'],

    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            activeLeftIconIndex: 0,
            leftIconModalOpen: false,
            leftBgModalOpen: false,
            midBgModalOpen: false,
            midIconModalOpen: false,
            rightBgModalOpen: false,
            rightIconModalOpen: false,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        c() {
            return this.element.config;
        },

        bgTypeOptions() {
            return [
                { value: 'color', label: this.$tc('mw-cms.elements.mwTripleCard.config.bgTypeColor') },
                { value: 'image', label: this.$tc('mw-cms.elements.mwTripleCard.config.bgTypeImage') },
            ];
        },

        linkTypeOptions() {
            return [
                { value: 'external', label: this.$tc('mw-cms.elements.mwTripleCard.config.linkTypeExternal') || 'External' },
                { value: 'internal', label: this.$tc('mw-cms.elements.mwTripleCard.config.linkTypeInternal') || 'Internal' },
            ];
        },

        leftIcons() {
            return this.c.leftIcons?.value ?? [];
        },

        activeLeftIcon() {
            return this.leftIcons[this.activeLeftIconIndex] ?? null;
        },

        leftIconUploadTag() {
            return `mw-tc-left-icon-${this.element.id}-${this.activeLeftIconIndex}`;
        },

        leftBgUploadTag()    { return `mw-tc-left-bg-${this.element.id}`; },
        midBgUploadTag()     { return `mw-tc-mid-bg-${this.element.id}`; },
        midIconUploadTag()   { return `mw-tc-mid-icon-${this.element.id}`; },
        rightBgUploadTag()   { return `mw-tc-right-bg-${this.element.id}`; },
        rightIconUploadTag() { return `mw-tc-right-icon-${this.element.id}`; },
    },

    created() {
        this.initElementConfig('mw-triple-card');
        if (!Array.isArray(this.c.leftIcons?.value)) {
            if (!this.c.leftIcons) {
                this.c.leftIcons = { source: 'static', value: [] };
            }
            this.c.leftIcons.value = [{ iconId: null, iconUrl: null, iconMimeType: null, iconDesc: '', iconColor: '', iconTextColor: '' }];
        }
    },

    methods: {
        onInput() {
            this.$emit('element-update', this.element);
        },

        // ── Left icons repeatable ──────────────────────────────
        addLeftIcon() {
            this.c.leftIcons.value.push({ iconId: null, iconUrl: null, iconMimeType: null, iconDesc: '', iconColor: '', iconTextColor: '' });
            this.activeLeftIconIndex = this.leftIcons.length - 1;
            this.onInput();
        },

        removeLeftIcon(index) {
            this.c.leftIcons.value.splice(index, 1);
            if (this.activeLeftIconIndex >= this.leftIcons.length) {
                this.activeLeftIconIndex = Math.max(0, this.leftIcons.length - 1);
            }
            this.onInput();
        },

        updateLeftIcon(field, value) {
            if (!this.activeLeftIcon) return;
            this.c.leftIcons.value[this.activeLeftIconIndex][field] = value;
            this.onInput();
        },

        async onLeftIconUpload({ targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.c.leftIcons.value[this.activeLeftIconIndex].iconId = media.id;
            this.c.leftIcons.value[this.activeLeftIconIndex].iconUrl = media.url;
            this.c.leftIcons.value[this.activeLeftIconIndex].iconMimeType = media.mimeType;
            this.onInput();
        },

        onLeftIconRemove() {
            this.c.leftIcons.value[this.activeLeftIconIndex].iconId = null;
            this.c.leftIcons.value[this.activeLeftIconIndex].iconUrl = null;
            this.c.leftIcons.value[this.activeLeftIconIndex].iconMimeType = null;
            this.onInput();
        },

        onLeftIconMediaSelect(mediaItems) {
            const media = mediaItems[0];
            this.c.leftIcons.value[this.activeLeftIconIndex].iconId = media.id;
            this.c.leftIcons.value[this.activeLeftIconIndex].iconUrl = media.url;
            this.c.leftIcons.value[this.activeLeftIconIndex].iconMimeType = media.mimeType;
            this.leftIconModalOpen = false;
            this.onInput();
        },

        onRightLinkTypeChange() {
            this.c.rightLinkUrl.value = '';
            this.onInput();
        },

        onMidLinkTypeChange() {
            this.c.midBtnUrl.value = '';
            this.onInput();
        },

        // ── Generic single-media helpers ──────────────────────
        async onMediaUpload(mediaIdField, mediaUrlField, { targetId }) {
            const media = await this.mediaRepository.get(targetId);
            this.c[mediaIdField].value = media.id;
            this.c[mediaUrlField].value = media.url;
            this.onInput();
        },

        onMediaRemove(mediaIdField, mediaUrlField) {
            this.c[mediaIdField].value = null;
            this.c[mediaUrlField].value = null;
            this.onInput();
        },

        onMediaSelect(mediaIdField, mediaUrlField, modalOpenField, mediaItems) {
            const media = mediaItems[0];
            this.c[mediaIdField].value = media.id;
            this.c[mediaUrlField].value = media.url;
            this[modalOpenField] = false;
            this.onInput();
        },
    },
};
