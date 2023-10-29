import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { HeatmapLayer, GoogleMapReact } from "@react-google-maps/api";

const containerStyle = {
  width: "90%",
  height: "90%",
};

const center = {
  lat: 25.4484,
  lng: 78.5685,
};

function Sand() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD40PXUcPf7OjgfsjfnJestdq3kwgMJPIs",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>

      <GoogleMap
        bootstrapURLKeys={{
          key: ["AIzaSyD40PXUcPf7OjgfsjfnJestdq3kwgMJPIs"],
          libraries: ["visualization"]
        }}
        center={center}
        heatmap={{ center }}
      ></GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Sand);
