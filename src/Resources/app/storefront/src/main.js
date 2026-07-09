import mainhattanHeaderHoverAddRemove from './js/mainhattan-header-hover-add-remove-class.plugin';

const PluginManager = window.PluginManager;
PluginManager.override('FlyoutMenu', mainhattanHeaderHoverAddRemove, '[data-flyout-menu]');
PluginManager.register('MwProfileTabs', () => import('./js/mw-profile-tabs.plugin'), '[data-mw-profile-tabs="true"]');
PluginManager.register('IctContentTabs', () => import('./js/ict-content-tabs/ict-content-tabs.plugin'), '[data-ict-content-tabs]');
PluginManager.register('MwBeforeAfter', () => import('./js/mw-before-after.plugin'), '[data-mw-before-after]');
PluginManager.register('MwVideoPlayer', () => import('./js/mw-video-player.plugin'), '[data-mw-video-player]');
PluginManager.register('MwTechnicalFeatureGallery', () => import('./js/mw-technical-feature-gallery.plugin'), '[data-mw-technical-feature-gallery="true"]');
