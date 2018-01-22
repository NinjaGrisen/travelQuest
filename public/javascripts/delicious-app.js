import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead'
import ajaxHeart from './modules/heart';
import citySearch from './modules/citySearch';
import loadPlaces from './modules/map';
import completedQuest from './modules/completedQuest';
import mobileToggle from './modules/mobileToggle';
import toggleDescription from './modules/descriptionToggle';

autocomplete($('#address'), $('#lat'), $('#lng'));
autocomplete($('#city'), $('#cityLat'), $('#cityLng'));
typeAhead($('.search'));

mobileToggle($('.menu-btn'), $('.menu-sidebar'), $('.menu-btn__icon'));

if($('.single__description-toggle') && $('.single__description')) {
    toggleDescription($('.single__description-toggle'), $('.single__description'));
}


if($('#complete-quest')) {
    completedQuest($('#complete-quest'), $('#completed-quest-form'), $('.completed-quest__close'));
}
if($('#searchForm')) {
    citySearch($('#searchForm'), $$('.city-search'));

}

if($('#map')) {
    loadPlaces();
}

const heartForms = $$('form.heart');
heartForms.on('submit', ajaxHeart);

const completeForms = $$('form.completet');
completeForms.on('submit', ajaxHeart);
