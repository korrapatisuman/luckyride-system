import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

// Routing
function Routing({ pickupCoords, dropCoords }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!pickupCoords || !dropCoords) return;

    if (routingRef.current) {
      routingRef.current.setWaypoints([
        L.latLng(pickupCoords.lat, pickupCoords.lng),
        L.latLng(dropCoords.lat, dropCoords.lng),
      ]);
      return;
    }

    routingRef.current = L.Routing.control({
      waypoints: [
        L.latLng(pickupCoords.lat, pickupCoords.lng),
        L.latLng(dropCoords.lat, dropCoords.lng),
      ],
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      createMarker: () => null,
    }).addTo(map);
  }, [pickupCoords, dropCoords, map]);

  return null;
}

// Click Handler
function ClickHandler({ setCoords }) {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e) => {
      setCoords({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [map, setCoords]);

  return null;
}

// Main Component
export default function MapPicker({ pickupCoords, dropCoords, setCoords }) {
  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={13}
      style={{ height: "300px", width: "100%", marginTop: 10 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ClickHandler setCoords={setCoords} />

      {pickupCoords && <Marker position={pickupCoords} />}
      {dropCoords && <Marker position={dropCoords} />}

      <Routing pickupCoords={pickupCoords} dropCoords={dropCoords} />
    </MapContainer>
  );
}