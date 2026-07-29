import template from './sw-cms-el-mw-load-capacity-table.html.twig';
import './sw-cms-el-mw-load-capacity-table.scss';

const ELEMENT_NAME = 'mw-load-capacity-table';
const { Mixin } = Shopware;

export default {
    template,

    compatConfig: Shopware.compatConfig,

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        columnGroups() {
            const value = this.element.config?.columnGroups?.value;
            return Array.isArray(value) ? value : [];
        },

        hasContent() {
            return this.columnGroups.length > 0;
        },
    },

    created() {
        this.initElementConfig(ELEMENT_NAME);
        this.ensureDefaultColumnGroup();
    },

    methods: {
        ensureDefaultColumnGroup() {
            if (!Array.isArray(this.element.config?.columnGroups?.value)) {
                this.element.config.columnGroups.value = [];
            }
            if (this.element.config.columnGroups.value.length === 0) {
                this.element.config.columnGroups.value = [
                    { title: 'Loadindex', rangeLabel: '72-85', rows: [{ label: '73', value: '365 kg' }] },
                ];
            }
        },
    },
};
