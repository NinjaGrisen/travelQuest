import { $ } from './bling';

function citySearch(searchForm, cities) {
    const citiesName = [];

    searchForm.addEventListener('keyup', activeSearchForm, false);

    function activeSearchForm(e) {
        let query = searchForm.value;
        if(query.length > 2) {
            showMatchingCitites(query);
        } else {
            resetCities(query);
        }
    }

    function showMatchingCitites(query) {
        cities.forEach((el) => {
            let cityName = el.textContent.toLowerCase();
            if(cityName.includes(query.toLowerCase())) {
                el.classList.add('city-search__visible');
            } else if(el.classList.contains('city-search__visible')){
                el.classList.remove('city-search__visible')
            }
        });
    }

    function resetCities(query) {
        cities.forEach((el) => {
            el.classList.remove('city-search__visible');
        });
    }
}

export default citySearch;