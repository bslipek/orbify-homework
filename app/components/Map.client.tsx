import type { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, GeoJSON, GeoJSONProps } from "react-leaflet";
import bbox from "geojson-bbox";
import "leaflet/dist/leaflet.css";

export function Map({
  height,
  data,
}: {
  height: string;
  data: GeoJSONProps["data"];
}) {
  if (!data) return null;

  const extent = bbox(data) as [number, number, number, number];

  const bounds = [
    [extent[1], extent[0]],
    [extent[3], extent[2]],
  ];

  console.log(bbox, extent);

  return (
    <div style={{ height }}>
      <MapContainer
        style={{
          height: "100%",
        }}
        bounds={bounds.map(([lat, lng]) => [lat, lng] as LatLngTuple)}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={data} />
      </MapContainer>
    </div>
  );
}
