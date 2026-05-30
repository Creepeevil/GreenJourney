import type { ParticipantJourney, RouteStop, StopVisualStatus } from "../types/journey";

export const getRequiredStops = (stops: RouteStop[]) => stops.filter((stop) => stop.required);

export const getProgress = (journey: ParticipantJourney, stops: RouteStop[]) => {
  const requiredStops = getRequiredStops(stops);
  const completedRequired = requiredStops.filter((stop) => journey.completedStopIds.includes(stop.id));
  const total = requiredStops.length;
  const completed = completedRequired.length;

  return {
    total,
    completed,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    isComplete: total > 0 && completed === total
  };
};

export const hasProofForStop = (journey: ParticipantJourney, stopId: string) =>
  journey.proofs.some((proof) => proof.stopId === stopId);

export const getStopStatus = (journey: ParticipantJourney, stop: RouteStop): StopVisualStatus => {
  if (journey.completedStopIds.includes(stop.id)) return "completed";
  return "available";
};

export const canCompleteStop = (journey: ParticipantJourney, stop: RouteStop, stops: RouteStop[]) => {
  if (journey.completedStopIds.includes(stop.id)) return { ok: false, message: "Trạm này đã được đóng dấu." };

  const previousRequired = stops.filter((item) => item.required && item.order < stop.order);
  const previousDone = previousRequired.every((item) => journey.completedStopIds.includes(item.id));

  if (stop.id === "stop-forest-keeper") {
    return previousDone
      ? { ok: true, message: "" }
      : { ok: false, message: "Bạn cần hoàn thành các trạm trước khi nhận mã đổi quà." };
  }

  if (!hasProofForStop(journey, stop.id)) {
    return { ok: false, message: "Bạn cần gửi ảnh minh chứng hoặc dữ liệu nhiệm vụ trước khi đóng dấu." };
  }

  return {
    ok: true,
    message: previousDone ? "" : "Bạn vẫn có thể đóng dấu, nhưng BTC khuyến khích đi theo thứ tự hành trình."
  };
};

export const encouragements = [
  "Bạn vừa cứu thêm một vòng đời cho trang giấy cũ.",
  "Một cuốn vở mới đang được sinh ra từ hành động nhỏ của bạn.",
  "Bạn đã tiến gần hơn đến món quà xanh.",
  "Passport của bạn vừa có thêm một dấu mốc đáng nhớ."
];
