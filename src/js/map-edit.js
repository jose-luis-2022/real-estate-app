(function() {
    const lat = document.getElementById("latitude").value ? document.getElementById("latitude").value : 33.7190575;
    const lng = document.getElementById("longitude").value ? document.getElementById("longitude").value : -84.3917458;
    const map = L.map('map').setView([lat, lng ], 14);
    let marker;
    
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(map);

    marker.on("moveend", function(e){
        marker = e.target
        const position = marker.getLatLng();
        map.panTo(new L.LatLng(position.lat, position.lng))

        geocodeService.reverse().latlng(position, 13).run(function(error, result){
            marker.bindPopup(result.address.LongLabel);
            document.querySelector(".street").textContent = result?.address?.Address ?? ""
            document.getElementById("street").value = result?.address?.Address ?? ""
            document.getElementById("latitude").value = result?.latlng?.lat ?? ""
            document.getElementById("longitude").value = result?.latlng?.lng ?? ""
        });
    })


})()