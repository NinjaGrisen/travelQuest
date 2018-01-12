function loadPlaces() {
    var map;
    function initMap() {
        var coord = {
            lat: parseFloat(document.getElementById('map').dataset["lat"]), 
            lng: parseFloat(document.getElementById('map').dataset["lng"])
        };

        map = new google.maps.Map(document.getElementById('map'), {
            center: coord,
            zoom: 18           
        });
        
        var marker = new google.maps.Marker({
            position: coord,
            map: map
          });
    }
    initMap();
}

export default loadPlaces;

