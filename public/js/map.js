(function () {
  "use strict";

  var mapEl = document.getElementById("listing-map");
  if (!mapEl || typeof L === "undefined") return;

  var lat = parseFloat(mapEl.dataset.lat);
  var lng = parseFloat(mapEl.dataset.lng);
  var address = mapEl.dataset.address || "";
  var title = mapEl.dataset.title || "Listing location";

  var hasCoords = !isNaN(lat) && !isNaN(lng);

  var map = L.map(mapEl, {
    scrollWheelZoom: false,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  var brandIcon = L.divIcon({
    className: "map-marker-pin",
    html: '<i class="fa-solid fa-location-dot"></i>',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  function placeMarker(latitude, longitude) {
    map.setView([latitude, longitude], 14);
    L.marker([latitude, longitude], { icon: brandIcon })
      .addTo(map)
      .bindPopup("<strong>" + escapeHtml(title) + "</strong>")
      .openPopup();
    mapEl.classList.remove("map-loading");
  }

  function showMapError() {
    mapEl.classList.add("map-error");
    mapEl.classList.remove("map-loading");
    mapEl.innerHTML =
      '<p class="map-error-text"><i class="fa-solid fa-map"></i> Map unavailable for this address. Try the link below.</p>';
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  if (hasCoords) {
    placeMarker(lat, lng);
    return;
  }

  if (!address) {
    showMapError();
    return;
  }

  var geocodeUrl =
    "https://nominatim.openstreetmap.org/search?format=json&q=" +
    encodeURIComponent(address) +
    "&limit=1";

  fetch(geocodeUrl, {
    headers: { Accept: "application/json" },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data && data[0]) {
        placeMarker(parseFloat(data[0].lat), parseFloat(data[0].lon));
      } else {
        showMapError();
      }
    })
    .catch(function () {
      showMapError();
    });
})();
