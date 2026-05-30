import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import type { ParticipantJourney, RouteStop } from "../../types/journey";
import { getStopStatus } from "../../utils/progress";
import { StopMarker } from "./StopMarker";

type JourneyMapProps = {
  stops: RouteStop[];
  journey: ParticipantJourney;
  onSelectStop: (stop: RouteStop) => void;
};

export function JourneyMap({ stops, journey, onSelectStop }: JourneyMapProps) {
  const center = stops[0] ? [stops[0].lat, stops[0].lng] as [number, number] : [10.7769, 106.7009] as [number, number];
  const route = stops.map((stop) => [stop.lat, stop.lng] as [number, number]);

  return (
    <div className="h-[430px] overflow-hidden rounded-lg border border-leaf-900/10 bg-white shadow-soft">
      <MapContainer center={center} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={route} pathOptions={{ color: "#2f6638", weight: 5, opacity: 0.72 }} />
        {stops.map((stop) => (
          <StopMarker key={stop.id} stop={stop} status={getStopStatus(journey, stop)} onClick={() => onSelectStop(stop)} />
        ))}
      </MapContainer>
    </div>
  );
}
