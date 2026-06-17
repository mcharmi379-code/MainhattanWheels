import template from './sw-cms-el-mw-category-showcase.html.twig';
import './sw-cms-el-mw-category-showcase.scss';

const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

export default {
    template,
    compatConfig: Shopware.compatConfig,
    mixins: [Mixin.getByName('cms-element')],

    inject: ['repositoryFactory'],

    data() {
        return {
            mainCategoryEntity: null,
            subCategoryEntities: [],
        };
    },

    computed: {
        categoryRepository() {
            return this.repositoryFactory.create('category');
        },

        visibleCards() {
            return this.element?.config?.visibleCards?.value || 5;
        },

        showAllLabel() {
            return this.element?.config?.showAllLabel?.value || 'VIEW ALL';
        },

        learnMoreLabel() {
            return this.element?.config?.learnMoreLabel?.value || 'LEARN MORE';
        },

        showAllColor() {
            return this.element?.config?.showAllColor?.value || '';
        },

        learnMoreColor() {
            return this.element?.config?.learnMoreColor?.value || '';
        },

        cardBorderColor() {
            return this.element?.config?.cardBorderColor?.value || '';
        },

        cardBgColor() {
            return this.element?.config?.cardBgColor?.value || '';
        },

        inlineStyles() {
            return {
                '--mw-visible-cards': this.visibleCards,
                '--mw-show-all-color': this.showAllColor || 'inherit',
                '--mw-learn-more-color': this.learnMoreColor || 'inherit',
                '--mw-card-border': this.cardBorderColor || 'transparent',
                '--mw-card-bg': this.cardBgColor || 'transparent',
            };
        },

        mainCategoryName() {
            if (this.mainCategoryEntity) {
                return (this.mainCategoryEntity.translated?.name || this.mainCategoryEntity.name || '').toUpperCase();
            }
            return 'KATEGORIE';
        },

        displayCategories() {
            if (this.subCategoryEntities.length > 0) {
                return this.subCategoryEntities.slice(0, this.visibleCards).map(cat => ({
                    id: cat.id,
                    name: (cat.translated?.name || cat.name || '').toUpperCase(),
                    description: cat.translated?.description ? cat.translated.description.replace(/<[^>]*>/g, '').slice(0, 60) : '',
                    mediaUrl: cat.media?.url || null,
                }));
            }

            const mocks = [];
            for (let i = 1; i <= this.visibleCards; i++) {
                mocks.push({
                    id: null,
                    name: `Kategorie ${i}`,
                    description: 'This is a description of the category showcasing how it looks.',
                    mediaUrl: null,
                });
            }
            return mocks;
        },
    },

    watch: {
        'element.config.mainCategory.value': {
            handler() {
                this.fetchMainCategory();
            },
            immediate: true,
        },
        'element.config.subCategories.value': {
            handler() {
                this.fetchSubCategories();
            },
            immediate: true,
            deep: true,
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mw-category-showcase');
        },

        async fetchMainCategory() {
            const id = this.element?.config?.mainCategory?.value;
            if (!id) {
                this.mainCategoryEntity = null;
                return;
            }
            try {
                this.mainCategoryEntity = await this.categoryRepository.get(id, Shopware.Context.api);
            } catch (e) {
                this.mainCategoryEntity = null;
            }
        },

        async fetchSubCategories() {
            const ids = this.element?.config?.subCategories?.value;
            if (!Array.isArray(ids) || ids.length === 0) {
                this.subCategoryEntities = [];
                return;
            }
            try {
                const criteria = new Criteria();
                criteria.addAssociation('media');
                criteria.setIds(ids.filter(id => !!id));
                const result = await this.categoryRepository.search(criteria, Shopware.Context.api);
                const sorted = [];
                ids.forEach(id => {
                    if (id) {
                        const found = result.get(id);
                        if (found) {
                            sorted.push(found);
                        }
                    }
                });
                this.subCategoryEntities = sorted;
            } catch (e) {
                this.subCategoryEntities = [];
            }
        },
    },
};
