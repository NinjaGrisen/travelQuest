import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead'
import ajaxHeart from './modules/heart';

autocomplete($('#address'), $('#lat'), $('#lng'));
autocomplete($('#city'), $('#cityLat'), $('#cityLng'));
typeAhead($('.search'));

const heartForms = $$('form.heart');
heartForms.on('submit', ajaxHeart);

const completeForms = $$('form.completet');
completeForms.on('submit', ajaxHeart);
