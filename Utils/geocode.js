/**
 * Geocode address strings using OpenStreetMap Nominatim (free, no API key).
 * https://operations.osmfoundation.org/policies/nominatim/
 */

async function geocodeAddress(listing) {
  const parts = [listing.location, listing.city, listing.country].filter(Boolean);
  const query = parts.join(", ").trim();

  if (!query) return null;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "json");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "1");

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "WanderLust-Airbnb-Project/1.0 (educational)",
        Accept: "application/json",
      },
    });

    if (!response.ok) return null;

    const results = await response.json();
    if (!results || !results.length) return null;

    const { lat, lon } = results[0];
    return {
      type: "Point",
      coordinates: [parseFloat(lon), parseFloat(lat)],
    };
  } catch (err) {
    console.error("Geocoding failed:", err.message);
    return null;
  }
}

module.exports = { geocodeAddress };
