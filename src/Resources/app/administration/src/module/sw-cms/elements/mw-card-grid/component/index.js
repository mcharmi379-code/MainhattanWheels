import template from './sw-cms-el-mw-card-grid.html.twig';
import './sw-cms-el-mw-card-grid.scss';

const { Mixin } = Shopware;

export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        cards() {
            return this.element?.config?.cards?.value ?? [];
        },

        columns() {
            return this.element?.config?.columns?.value ?? 4;
        },

        gridStyle() {
            return {
                '--mw-card-grid-columns': this.columns,
            };
        },
    },

    created() {
        this.initElementConfig('mw-card-grid');

        if (!Array.isArray(this.element.config.cards.value) || this.element.config.cards.value.length === 0) {
            this.element.config.cards.value = [
                { iconId: null, iconUrl: null, iconMimeType: null, iconColor: '', heading: '', headingColor: '', subheading: '', subheadingColor: '', linkType: 'internal', linkUrl: '', linkNewTab: false, hoverColor: '#ff6600' },
                { iconId: null, iconUrl: null, iconMimeType: null, iconColor: '', heading: '', headingColor: '', subheading: '', subheadingColor: '', linkType: 'internal', linkUrl: '', linkNewTab: false, hoverColor: '#ff6600' },
                { iconId: null, iconUrl: null, iconMimeType: null, iconColor: '', heading: '', headingColor: '', subheading: '', subheadingColor: '', linkType: 'internal', linkUrl: '', linkNewTab: false, hoverColor: '#ff6600' },
                { iconId: null, iconUrl: null, iconMimeType: null, iconColor: '', heading: '', headingColor: '', subheading: '', subheadingColor: '', linkType: 'internal', linkUrl: '', linkNewTab: false, hoverColor: '#ff6600' }
            ];
        }
    },
};
