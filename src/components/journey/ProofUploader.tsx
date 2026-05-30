import { Camera, Upload } from "lucide-react";
import { useState } from "react";
import type { ParticipantJourney, Proof, RouteStop } from "../../types/journey";

type ProofUploaderProps = {
  journey: ParticipantJourney;
  stop: RouteStop;
  onSave: (proof: Proof) => void;
};

export function ProofUploader({ journey, stop, onSave }: ProofUploaderProps) {
  const existing = journey.proofs.find((proof) => proof.stopId === stop.id);
  const [preview, setPreview] = useState(existing?.localPreviewUrl ?? existing?.imageUrl ?? "");
  const [note, setNote] = useState(existing?.note ?? "");
  const [isReading, setIsReading] = useState(false);

  const handleFile = (file?: File) => {
    if (!file) return;
    setIsReading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(String(reader.result));
      setIsReading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!preview && !note.trim()) return;
    onSave({
      id: existing?.id ?? crypto.randomUUID(),
      stopId: stop.id,
      participantId: journey.participantId,
      localPreviewUrl: preview,
      note: note.trim(),
      createdAt: new Date().toISOString(),
      status: "pending"
    });
  };

  return (
    <div className="space-y-3 rounded-lg border border-leaf-900/10 bg-paper p-3">
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-kraft/60 bg-white/70 px-4 py-4 text-sm font-semibold text-leaf-900 hover:bg-white">
        <Camera size={18} />
        {isReading ? "Đang đọc ảnh..." : "Chụp / tải ảnh minh chứng"}
        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} />
      </label>
      {preview ? (
        <img src={preview} alt="Ảnh minh chứng" className="h-44 w-full rounded-lg object-cover" />
      ) : (
        <div className="grid h-32 place-items-center rounded-lg bg-white/70 text-sm text-ink/50">Chưa có ảnh minh chứng</div>
      )}
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Ghi một câu ngắn về điều bạn đã làm hoặc học được..."
        className="min-h-20 w-full rounded-lg border border-leaf-900/10 bg-white px-3 py-2 text-sm outline-none focus:border-leaf-700"
      />
      <button
        type="button"
        onClick={handleSave}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-leaf-700 px-4 py-3 text-sm font-bold text-white hover:bg-leaf-900 disabled:opacity-50"
        disabled={!preview && !note.trim()}
      >
        <Upload size={17} /> Gửi minh chứng
      </button>
    </div>
  );
}
