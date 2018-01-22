import { $ } from './bling';

function toggleDescription(toggleButton, toggleContainer) {
    toggleButton.on('click', () => {
        toggleButton.classList.toggle('single__description-toggle--expanded');
        toggleContainer.classList.toggle('single__description--expanded')
    });
}

export default toggleDescription;