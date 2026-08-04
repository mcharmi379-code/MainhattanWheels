import template from './sw-cms-el-mw-portfolio-gallery.html.twig';

const { Mixin } = Shopware;

export default {
    template,
    mixins: [Mixin.getByName('cms-element')],
    created() {
        this.initElementConfig('mw-portfolio-gallery');
    },
};
