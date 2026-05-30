export const buildJourneyPath = (workshopId: string) => `/journey/${workshopId}`;

export const buildJourneyMapPath = (workshopId: string, stopId?: string) => {
  const base = `/journey/${workshopId}/map`;
  return stopId ? `${base}?stopId=${encodeURIComponent(stopId)}` : base;
};

export const buildQrUrl = (workshopId: string, stopId?: string) => {
  if (typeof window === "undefined") return buildJourneyMapPath(workshopId, stopId);
  return `${window.location.origin}${buildJourneyMapPath(workshopId, stopId)}`;
};
