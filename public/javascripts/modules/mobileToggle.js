import { $ } from './bling';

function mobileToggle(mobileButton, sideMenu, container) {
    mobileButton.on('click', () => {
        toggleMobileMenu(sideMenu, container);
        console.log(container);
    });
}

function toggleMobileMenu(sideMenu, container) {
    sideMenu.classList.toggle('menu-sidebar--show');
    container.classList.toggle('content--show');

    $('body').classList.toggle('body--show');
    
}

export default mobileToggle;