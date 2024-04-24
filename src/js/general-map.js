(function(){
    const lat =  33.7190575;
    const lng = -84.3917458;
    const map = L.map("general-map").setView([lat, lng], 13);

    let markers = new L.FeatureGroup().addTo(map);

    const categorySelect = document.getElementById("categories");
    const priceSelect = document.getElementById("prices");

    let estates = [];

    const filters = {
      category: "",
      price: ""
    }

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

    categorySelect.addEventListener("change" , event => {
      filters.category = event.target.value;
      filterEstates()
    });

    priceSelect.addEventListener("change" , event => {
      filters.price = event.target.value;
      filterEstates()
    });

    const getEstates = async(req, res) => {

            try {
                const url = "/api/estates";
                const response = await fetch(url);
                estates = await response.json();
                showEstates(estates)
            } catch (error) {
                console.log(error)
            }
      }

    const showEstates = estates => {
        let categoryId;
        markers.clearLayers()

        estates.forEach(estate => {

            if(estate.category === "House"){
              categoryId = 1;
            } else if(estate.category === "Apartment") {
              categoryId = 2;
            }else if(estate.category === "Store"){
              categoryId = 3
            } else if(estate.category === "Land"){
              categoryId = 4
            } else if(estate.category === "Cabin"){
              categoryId = 5
            }

            const marker = new L.marker([estate?.lat, estate?.lng], {
                autoPan: true
            })
            .addTo(map)
            .bindPopup(`
                <p class="text-indigo-500 font-bold text-xs">${estate?.category}</p>
                <h1 class="text-sm font-bold uppercase mt-5 text-center">${estate?.title}</h1>
                <img class="mt-5" src=${estate.img_url} alt="Image of ${estate?.title}">
                <p class="text-gray-700 font-bold text-center">${estate?.price}</p>
                <a href="/category/${categoryId}/estate/${estate.id}" class="show-estate-map block p-2 text-center text-white font-bold uppercase rounded-md">Watch Estate</a>
                `)

            markers.addLayer(marker)
        });
      };

      const filterEstates = () => {
        const estatesFiltered = estates.filter(filterCategory).filter(filterPrice);
        showEstates(estatesFiltered);
      };

      const filterCategory = (estate) => {
        return filters.category ? estate.category === filters.category : estate
      };

      const filterPrice = (estate) => {
        return filters.price ? estate.price === filters.price : estate
      };

      getEstates()
})()