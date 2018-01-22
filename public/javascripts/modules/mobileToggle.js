import { $ } from './bling';

function mobileToggle(mobileButton, sideMenu, icon) {
    mobileButton.on('click', () => {
        toggleMobileMenu(sideMenu, icon);
    });
}

function toggleMobileMenu(sideMenu, icon) {
    sideMenu.classList.toggle('menu-sidebar--show');
    icon.classList.toggle('menu-btn__icon__active');
}

export default mobileToggle;