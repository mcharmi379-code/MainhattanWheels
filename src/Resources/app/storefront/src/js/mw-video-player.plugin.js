import Plugin from 'src/plugin-system/plugin.class';

export default class MwVideoPlayer extends Plugin {
    init() {
        this.players = this.el.querySelectorAll('[data-mw-video-player="true"]');
        this.initPlayers();
    }

    initPlayers() {
        this.players.forEach((player) => {
            const wrapper = player.querySelector('.mw-text-video-player-wrapper');
            if (!wrapper) return;

            const videoElement = wrapper.querySelector('video');
            const playButton = wrapper.querySelector('.mw-text-video-play-overlay');
            const embedUrl = wrapper.dataset.videoEmbed;

            if (videoElement && playButton) {
                // Direct video files play inline
                const startVideo = () => {
                    videoElement.setAttribute('controls', 'true');
                    videoElement.play();
                    playButton.style.display = 'none';
                };

                playButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    startVideo();
                });
                
                wrapper.addEventListener('click', (e) => {
                    if (e.target !== videoElement) {
                        startVideo();
                    }
                });
            } else if (embedUrl && playButton) {
                // External embed links play inside a fullscreen modal
                const openModal = () => {
                    const modal = document.createElement('div');
                    modal.className = 'mw-video-modal';
                    modal.innerHTML = `
                        <button class="mw-video-modal-close" aria-label="Close modal">&times;</button>
                        <div class="mw-video-modal-container">
                            <iframe src="${embedUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        </div>
                    `;

                    document.body.appendChild(modal);

                    // Trigger transition
                    modal.offsetHeight;
                    modal.classList.add('is--active');

                    const closeModal = () => {
                        modal.classList.remove('is--active');
                        setTimeout(() => {
                            modal.remove();
                        }, 300);
                    };

                    modal.querySelector('.mw-video-modal-close').addEventListener('click', closeModal);
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            closeModal();
                        }
                    });
                };

                playButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openModal();
                });
                
                wrapper.addEventListener('click', openModal);
            }
        });
    }
}
