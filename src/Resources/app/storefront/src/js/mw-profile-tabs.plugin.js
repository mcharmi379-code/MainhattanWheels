import Plugin from 'src/plugin-system/plugin.class';

export default class MwProfileTabs extends Plugin {
    init() {
        this.triggers = this.el.querySelectorAll('[data-mw-profile-tabs-trigger]');
        this.panels = this.el.querySelectorAll('[data-mw-profile-tabs-panel]');

        this._registerEvents();
    }

    _registerEvents() {
        this.triggers.forEach((trigger) => {
            trigger.addEventListener('click', this._onTriggerClick.bind(this));
        });
    }

    _onTriggerClick(event) {
        const trigger = event.currentTarget;
        const index = trigger.getAttribute('data-mw-profile-tabs-trigger');

        this.triggers.forEach((button) => {
            const isActive = button === trigger;
            button.classList.toggle('is--active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        this.panels.forEach((panel) => {
            panel.classList.toggle('is--active', panel.getAttribute('data-mw-profile-tabs-panel') === index);
        });
    }
}
