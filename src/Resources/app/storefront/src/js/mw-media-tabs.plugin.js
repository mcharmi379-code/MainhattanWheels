import Plugin from 'src/plugin-system/plugin.class';

export default class MwMediaTabsPlugin extends Plugin {
    init() {
        this.triggers = Array.from(this.el.querySelectorAll('[data-mw-media-tabs-trigger]'));
        this.panels = Array.from(this.el.querySelectorAll('[data-mw-media-tabs-panel]'));

        this.triggers.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                this.activate(Number(trigger.dataset.tabIndex || 0));
            });
        });
    }

    activate(index) {
        this.triggers.forEach((trigger, triggerIndex) => {
            const active = triggerIndex === index;
            trigger.classList.toggle('is--active', active);
            trigger.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        this.panels.forEach((panel, panelIndex) => {
            const active = panelIndex === index;
            panel.classList.toggle('is--active', active);
            if (active) {
                panel.removeAttribute('hidden');
            } else {
                panel.setAttribute('hidden', '');
            }
        });
    }
}
