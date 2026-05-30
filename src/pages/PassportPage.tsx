import { Gift, ImageOff } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProgressCard } from "../components/journey/ProgressCard";
import { RewardModal } from "../components/journey/RewardModal";
import { StampBadge } from "../components/journey/StampBadge";
import { PageShell } from "../components/layout/PageShell";
import { getStopsByWorkshop } from "../data/routeStops";
import { getWorkshopById } from "../data/workshops";
import { loadJourney, setRewardStatus } from "../services/journeyStorage";
import { getProgress } from "../utils/progress";

export function PassportPage() {
  const { workshopId = "green-paper-2026-06-13" } = useParams();
  const workshop = getWorkshopById(workshopId);
  const stops = useMemo(() => getStopsByWorkshop(workshop.id), [workshop.id]);
  const [journey, setJourney] = useState(() => loadJourney(workshop.id));
  const [rewardOpen, setRewardOpen] = useState(false);
  const progress = getProgress(journey, stops);

  return (
    <PageShell workshopId={workshop.id}>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-4">
            <ProgressCard journey={journey} stops={stops} />
            <section className="rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-soft">
              <p className="text-sm font-semibold text-kraft">Passport số</p>
              <h1 className="mt-1 text-2xl font-black text-leaf-900">{journey.displayName || "Người tham gia xanh"}</h1>
              <p className="mt-2 text-sm text-ink/65">ID: {journey.participantId}</p>
              <p className="mt-1 text-sm text-ink/65">Lựa chọn vở: {journey.notebookChoice === "donate" ? "Gửi tặng" : journey.notebookChoice === "take_home" ? "Mang về" : "Chưa quyết định"}</p>
              {journey.rewardCode ? (
                <button onClick={() => setRewardOpen(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-leaf-700 px-4 py-3 font-bold text-white">
                  <Gift size={17} /> Xem mã đổi quà
                </button>
              ) : (
                <Link to={`/journey/${workshop.id}/map?stopId=stop-forest-keeper`} className="mt-4 block rounded-lg bg-kraft px-4 py-3 text-center font-bold text-white">
                  {progress.isComplete ? "Nhận mã đổi quà" : "Tiếp tục hành trình"}
                </Link>
              )}
            </section>
          </aside>
          <section className="space-y-5">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {stops.map((stop) => (
                <StampBadge key={stop.id} label={stop.stampLabel} order={stop.order} completed={journey.completedStopIds.includes(stop.id)} />
              ))}
            </div>
            <section className="rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-soft">
              <h2 className="text-xl font-black text-leaf-900">Minh chứng hành trình</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {stops.slice(0, 5).map((stop) => {
                  const proof = journey.proofs.find((item) => item.stopId === stop.id);
                  return (
                    <article key={stop.id} className="rounded-lg bg-paper p-3">
                      <h3 className="font-bold text-leaf-900">{stop.title}</h3>
                      {proof?.localPreviewUrl || proof?.imageUrl ? (
                        <img src={proof.localPreviewUrl ?? proof.imageUrl} alt={stop.title} className="mt-3 h-40 w-full rounded-lg object-cover" />
                      ) : (
                        <div className="mt-3 grid h-40 place-items-center rounded-lg bg-white text-ink/40"><ImageOff /></div>
                      )}
                      <p className="mt-2 text-sm text-ink/65">{proof?.note || "Chưa có ghi chú."}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          </section>
        </div>
      </main>
      <RewardModal open={rewardOpen} journey={journey} onClose={() => setRewardOpen(false)} onMarkSent={() => setJourney(setRewardStatus(workshop.id, "sent_to_organizer"))} />
    </PageShell>
  );
}
