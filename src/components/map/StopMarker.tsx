import L from "leaflet";
import { Marker } from "react-leaflet";
import type { RouteStop, StopVisualStatus } from "../../types/journey";

const colorByStatus: Record<StopVisualStatus, string> = {
  locked: "#8b7b66",
  available: "#b7814a",
  completed: "#2f6638"
};

type StopMarkerProps = {
  stop: RouteStop;
  status: StopVisualStatus;
  onClick: () => void;
};

export function StopMarker({ stop, status, onClick }: StopMarkerProps) {
  const icon = L.divIcon({
    className: "",
    html: `<div class="stop-marker" style="background:${colorByStatus[status]}">${stop.order}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  return <Marker position={[stop.lat, stop.lng]} icon={icon} eventHandlers={{ click: onClick }} />;
}
