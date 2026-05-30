import { CheckCircle2, Gift, X } from "lucide-react";
import type { ParticipantJourney, Proof, RouteStop } from "../../types/journey";
import { canCompleteStop } from "../../utils/progress";
import { ProofUploader } from "../journey/ProofUploader";

type StopDetailDrawerProps = {
  stop?: RouteStop;
  stops: RouteStop[];
  journey: ParticipantJourney;
  warning?: string;
  onClose: () => void;
  onProofSave: (proof: Proof) => void;
  onComplete: (stop: RouteStop) => void;
};

export function StopDetailDrawer({ stop, stops, journey, warning, onClose, onProofSave, onComplete }: StopDetailDrawerProps) {
  if (!stop) return null;

  const completed = journey.completedStopIds.includes(stop.id);
  const proof = journey.proofs.find((item) => item.stopId === stop.id);
  const completion = canCompleteStop(journey, stop, stops);
  const isFinal = stop.id === "stop-forest-keeper";

  return (
    <div className="fixed inset-0 z-[900] bg-ink/35 md:grid md:place-items-end">
      <aside className="ml-auto flex h-full w-full max-w-xl flex-col overflow-y-auto bg-paper p-5 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-kraft">{stop.subtitle}</p>
            <h2 className="mt-1 text-2xl font-black text-leaf-900">{stop.title}</h2>
            <p className="mt-1 text-sm text-ink/60">{stop.address}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-white">
            <X size={20} />
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <section className="rounded-lg bg-white/80 p-4">
            <h3 className="font-bold text-leaf-900">Ý nghĩa</h3>
            <p className="mt-2 text-sm leading-6 text-ink/75">{stop.description}</p>
          </section>
          <section className="rounded-lg bg-white/80 p-4">
            <h3 className="font-bold text-leaf-900">Nhiệm vụ</h3>
            <p className="mt-2 text-sm leading-6 text-ink/75">{stop.mission}</p>
            <p className="mt-3 rounded-lg bg-leaf-50 p-3 text-sm text-leaf-900">{stop.proofHint}</p>
          </section>
          {!isFinal && <ProofUploader journey={journey} stop={stop} onSave={onProofSave} />}
          {proof && (
            <p className="rounded-lg bg-white p-3 text-sm text-ink/70">
              Minh chứng đã gửi, trạng thái: <b>{proof.status === "pending" ? "chờ BTC xem" : proof.status}</b>
            </p>
          )}
          {warning && <p className="rounded-lg bg-kraft/10 p-3 text-sm font-semibold text-kraft">{warning}</p>}
          {completed ? (
            <div className="flex items-center gap-2 rounded-lg bg-leaf-50 p-4 font-bold text-leaf-900">
              <CheckCircle2 size={20} /> {stop.stampLabel}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onComplete(stop)}
              disabled={!completion.ok && !completion.message.includes("khuyến khích")}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-leaf-700 px-4 py-3 font-bold text-white hover:bg-leaf-900 disabled:bg-ink/30"
            >
              {isFinal ? <Gift size={18} /> : <CheckCircle2 size={18} />} Đóng dấu trạm này
            </button>
          )}
          {!completion.ok && !completed && <p className="text-sm text-kraft">{completion.message}</p>}
        </div>
      </aside>
    </div>
  );
}
