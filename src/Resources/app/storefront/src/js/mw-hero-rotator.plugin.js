import Plugin from 'src/plugin-system/plugin.class';

const ACTIVE_CLASS = 'is-active';
const DEFAULT_TRANSITION_DURATION = 400;
const DEFAULT_ROTATION_INTERVAL = 3000;

export default class MwHeroRotator extends Plugin {
    constructor(element, options = {}) {
        super(element, options, 'MwHeroRotator');
    }

    init() {
        this.lines = Array.from(this.el.querySelectorAll('.cms-element-mw-hero-rotator__line'));

        if (this.lines.length < 2) {
            return;
        }

        this.transitionDuration = parseInt(this.el.dataset.transitionDuration, 10) || DEFAULT_TRANSITION_DURATION;
        this.rotationInterval = parseInt(this.el.dataset.rotationInterval, 10) || DEFAULT_ROTATION_INTERVAL;
        this.currentIndex = Math.max(this.lines.findIndex((line) => line.classList.contains(ACTIVE_CLASS)), 0);
        this.timer = null;

        this._scheduleNextRotation();
    }

    _scheduleNextRotation() {
        this.timer = setTimeout(() => {
            this._rotate();
            this._scheduleNextRotation();
        }, this.rotationInterval);
    }

    _rotate() {
        const nextIndex = (this.currentIndex + 1) % this.lines.length;
        const currentLine = this.lines[this.currentIndex];
        const nextLine = this.lines[nextIndex];

        currentLine.style.opacity = '0';
        currentLine.style.transform = 'translate(0, 30px)';

        setTimeout(() => {
            currentLine.classList.remove(ACTIVE_CLASS);
            currentLine.style.display = 'none';

            nextLine.style.display = 'inline-block';
            nextLine.style.transform = 'translate(0, -30px)';
            nextLine.style.opacity = '0';

            // Force a reflow so the browser registers the start state before animating in.
            void nextLine.offsetWidth;

            requestAnimationFrame(() => {
                nextLine.classList.add(ACTIVE_CLASS);
                nextLine.style.opacity = '1';
                nextLine.style.transform = 'translate(0, 0)';
            });
        }, this.transitionDuration);

        this.currentIndex = nextIndex;
    }
}
