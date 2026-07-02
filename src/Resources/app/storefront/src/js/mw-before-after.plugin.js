import Plugin from 'src/plugin-system/plugin.class';

export default class MwBeforeAfter extends Plugin {
    init() {
        const slider = this.el.querySelector('.mw-before-after-slider');
        if (!slider) return;

        const overlay = slider.querySelector('.mw-before-after-overlay');
        const handle = slider.querySelector('.mw-before-after-handle');
        const beforeImgContainer = slider.querySelector('.before-img-container');

        if (!overlay || !handle) return;

        // Set before image container to full slider width so it doesn't shrink inside the clipped overlay
        const syncWidth = () => {
            if (beforeImgContainer) {
                beforeImgContainer.style.width = slider.offsetWidth + 'px';
            }
        };
        syncWidth();
        window.addEventListener('resize', syncWidth);

        let dragging = false;

        const setPosition = (clientX) => {
            const rect = slider.getBoundingClientRect();
            let pct = ((clientX - rect.left) / rect.width) * 100;
            pct = Math.max(0, Math.min(100, pct));
            overlay.style.width = pct + '%';
            handle.style.left = pct + '%';
        };

        slider.addEventListener('pointerdown', (e) => {
            if (e.button !== undefined && e.button !== 0) return;
            e.preventDefault();
            dragging = true;
            slider.setPointerCapture(e.pointerId);
            setPosition(e.clientX);
        });

        slider.addEventListener('pointermove', (e) => {
            if (!dragging) return;
            setPosition(e.clientX);
        });

        slider.addEventListener('pointerup', (e) => {
            dragging = false;
            slider.releasePointerCapture(e.pointerId);
        });

        slider.addEventListener('pointercancel', () => {
            dragging = false;
        });
    }
}
