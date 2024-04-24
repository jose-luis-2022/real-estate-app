(function () {
    const lat = document.getElementById("lat").textContent;
    const lng = document.getElementById("lng").textContent;
    const street = document.getElementById("street").textContent;
    const map = L.map("map").setView([lat, lng], 15);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(street)
  })();
  