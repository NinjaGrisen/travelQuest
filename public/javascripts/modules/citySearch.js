import { $ } from './bling';

function citySearch(searchForm, cities) {
    const citiesName = [];

    searchForm.addEventListener('keyup', activeSearchForm, false);

    function activeSearchForm(e) {
        let query = searchForm.value;
        if(query.length > 2) {
            showMatchingCitites(query);
        }
    }

    function showMatchingCitites(query) {
        cities.forEach((el) => {
            let cityName = el.textContent.toLowerCase();
            if(cityName.includes(query.toLowerCase())) {
                el.classList.add('citySearch__visible');
            } else if(el.classList.contains('citySearch__visible')){
                el.classList.remove('citySearch__visible')
            }
        })
    }
}

export default citySearch;