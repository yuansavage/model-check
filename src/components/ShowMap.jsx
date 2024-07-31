import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoieXVhbnNhdmFnZSIsImEiOiJjbHluZDd3aTMwNGY1MmtzOWFpdjJzcm9zIn0._vR4i-_bHsJkC1FvTAuYGA";

const ShowMap = ({ location }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 10,
      pitch: 60,
      antialias: true,
    });

    // Geocode the address to get the coordinates
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      location
    )}.json?access_token=${mapboxgl.accessToken}`;

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const [longitude, latitude] = data.features[0].center;
          map.setCenter([longitude, latitude]);
          new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
        }
      })
      .catch((error) => console.error("Error fetching geocode:", error));

    // Clean up on unmount
    return () => map.remove();
  }, [location]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "300px" }} />
  );
};

export default ShowMap;
