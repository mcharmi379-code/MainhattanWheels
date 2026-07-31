const PluginManager = window.PluginManager;
console.log('[MainhattanWheels] storefront main.js loaded');

function safeOverride(name, pluginClass, selector) {
    try {
        PluginManager.override(name, pluginClass, selector);
    } catch (error) {
        console.warn(`[MainhattanWheels] Could not override plugin "${name}":`, error);
    }
}

safeOverride('FlyoutMenu', () => import('./js/mainhattan-header-hover-add-remove-class.plugin'), '[data-flyout-menu]');
safeOverride('CollapseFooterColumns', () => import('./js/mainhattan-collapse-footer-columns.plugin'), '[data-collapse-footer-columns="true"]');
PluginManager.register('MwProfileTabs', () => import('./js/mw-profile-tabs.plugin'), '[data-mw-profile-tabs="true"]');
PluginManager.register('IctContentTabs', () => import('./js/ict-content-tabs/ict-content-tabs.plugin'), '[data-ict-content-tabs]');
PluginManager.register('MwBeforeAfter', () => import('./js/mw-before-after.plugin'), '[data-mw-before-after]');
PluginManager.register('MwVideoPlayer', () => import('./js/mw-video-player.plugin'), '[data-mw-video-player]');
PluginManager.register('MwTechnicalFeatureGallery', () => import('./js/mw-technical-feature-gallery.plugin'), '[data-mw-technical-feature-gallery="true"]');
PluginManager.register('MwProductQuickOrder', () => import('./js/mw-product-quick-order.plugin'), '[data-mw-product-quick-order="true"]');
PluginManager.register('MwMediaTabs', () => import('./js/mw-media-tabs.plugin'), '[data-mw-media-tabs="true"]');
console.log('[MainhattanWheels] registering IctGalleryLightbox');
PluginManager.register('IctGalleryLightbox', () => import('./js/ict-gallery-lightbox/ict-gallery-lightbox.plugin'), '[data-ict-gallery]');
console.log('[MainhattanWheels] IctGalleryLightbox registered');
PluginManager.register('MwTabCards', () => import('./js/mw-tab-cards/mw-tab-cards.plugin'), '[data-mw-tab-cards="true"]');
PluginManager.register('MwHeroRotator', () => import('./js/mw-hero-rotator.plugin'), '[data-mw-hero-rotator="true"]');
