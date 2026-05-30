import { Gift, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ProgressCard } from "../components/journey/ProgressCard";
import { RewardModal } from "../components/journey/RewardModal";
import { PageShell } from "../components/layout/PageShell";
import { JourneyMap } from "../components/map/JourneyMap";
import { StopDetailDrawer } from "../components/map/StopDetailDrawer";
import { getStopsByWorkshop } from "../data/routeStops";
import { getWorkshopById } from "../data/workshops";
import { completeStop, ensureRewardCode, loadJourney, resetJourney, setRewardStatus, upsertProof } from "../services/journeyStorage";
import type { ParticipantJourney, Proof, RouteStop } from "../types/journey";
import { canCompleteStop, encouragements, getProgress } from "../utils/progress";

export function JourneyMapPage() {
  const { workshopId = "green-paper-2026-06-13" } = useParams();
  const [searchParams] = useSearchParams();
  const workshop = getWorkshopById(workshopId);
  const stops = useMemo(() => getStopsByWorkshop(workshop.id), [workshop.id]);
  const [journey, setJourney] = useState<ParticipantJourney>(() => loadJourney(workshop.id));
  const [selectedStop, setSelectedStop] = useState<RouteStop | undefined>();
  const [warning, setWarning] = useState("");
  const [rewardOpen, setRewardOpen] = useState(false);
  const [toast, setToast] = useState("");
  const progress = getProgress(journey, stops);

  useEffect(() => {
    const stopId = searchParams.get("stopId");
    if (stopId) setSelectedStop(stops.find((stop) => stop.id === stopId));
  }, [searchParams, stops]);

  const refresh = () => setJourney(loadJourney(workshop.id));

  const handleProofSave = (proof: Proof) => {
    setJourney(upsertProof(workshop.id, proof));
    setToast("Minh chứng đã được lưu vào passport.");
  };

  const handleComplete = (stop: RouteStop) => {
    const result = canCompleteStop(journey, stop, stops);
    if (!result.ok && !result.message.includes("khuyến khích")) {
      setWarning(result.message);
      return;
    }

    let next = completeStop(workshop.id, stop.id);
    if (stop.id === "stop-forest-keeper") {
      next = ensureRewardCode(workshop.id);
      setRewardOpen(true);
    }
    setJourney(next);
    setWarning(result.message);
    setToast(encouragements[(stop.order - 1) % encouragements.length]);
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc muốn reset hành trình demo trên thiết bị này?")) {
      setJourney(resetJourney(workshop.id));
      setSelectedStop(undefined);
      setToast("Hành trình demo đã được làm mới.");
    }
  };

  return (
    <PageShell workshopId={workshop.id}>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-4">
            <ProgressCard journey={journey} stops={stops} />
            <div className="rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-soft">
              <h1 className="text-xl font-black text-leaf-900">{workshop.topic}</h1>
              <p className="mt-2 text-sm text-ink/70">{workshop.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link to={`/journey/${workshop.id}/passport`} className="rounded-lg bg-leaf-700 px-3 py-3 text-center text-sm font-bold text-white">Mở passport</Link>
                <button
                  type="button"
                  onClick={() => {
                    if (journey.rewardCode || progress.isComplete) setRewardOpen(true);
                    else setSelectedStop(stops.find((stop) => stop.id === "stop-forest-keeper"));
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-kraft px-3 py-3 text-sm font-bold text-white"
                >
                  <Gift size={16} /> {journey.rewardCode ? "Phần thưởng" : "Trạm cuối"}
                </button>
              </div>
              <button type="button" onClick={handleReset} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-leaf-900/10 px-3 py-2 text-sm font-semibold text-ink/70 hover:bg-paper">
                <RotateCcw size={15} /> Reset journey demo
              </button>
            </div>
            {toast && <p className="rounded-lg bg-leaf-50 p-3 text-sm font-semibold text-leaf-900">{toast}</p>}
          </aside>
          <section className="space-y-4">
            <JourneyMap stops={stops} journey={journey} onSelectStop={(stop) => { setSelectedStop(stop); setWarning(""); }} />
            <div className="grid gap-3 md:grid-cols-2">
              {stops.map((stop) => {
                const done = journey.completedStopIds.includes(stop.id);
                return (
                  <button key={stop.id} type="button" onClick={() => setSelectedStop(stop)} className="rounded-lg border border-leaf-900/10 bg-white/85 p-4 text-left shadow-sm hover:border-leaf-700">
                    <p className="text-xs font-bold uppercase text-kraft">{stop.subtitle}</p>
                    <div className="mt-1 flex items-center justify-between gap-3">
                      <h3 className="font-black text-leaf-900">{stop.title}</h3>
                      <span className={`rounded-full px-2 py-1 text-xs font-bold ${done ? "bg-leaf-100 text-leaf-900" : "bg-kraft/10 text-kraft"}`}>{done ? "Đã đóng dấu" : "Đang mở"}</span>
                    </div>
                    <p className="mt-2 text-sm text-ink/65">{stop.stampLabel}</p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <StopDetailDrawer stop={selectedStop} stops={stops} journey={journey} warning={warning} onClose={() => { setSelectedStop(undefined); refresh(); }} onProofSave={handleProofSave} onComplete={handleComplete} />
      <RewardModal open={rewardOpen} journey={journey} onClose={() => setRewardOpen(false)} onMarkSent={() => setJourney(setRewardStatus(workshop.id, "sent_to_organizer"))} />
    </PageShell>
  );
}
