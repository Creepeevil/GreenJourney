import { Gift, LockKeyhole, Send, X } from "lucide-react";
import type { ParticipantJourney } from "../../types/journey";

type RewardModalProps = {
  open: boolean;
  journey: ParticipantJourney;
  onClose: () => void;
  onMarkSent?: () => void;
};

export function RewardModal({ open, journey, onClose, onMarkSent }: RewardModalProps) {
  if (!open) return null;

  const unlocked = Boolean(journey.rewardCode);

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-ink/45 p-4">
      <div className="w-full max-w-md rounded-lg bg-paper p-5 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-kraft">Phần thưởng xanh</p>
            <h2 className="mt-1 text-2xl font-bold text-leaf-900">
              {unlocked ? "Bạn đã hoàn thành hành trình!" : "Mã đổi quà đang khóa"}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-white" aria-label="Đóng modal phần thưởng">
            <X size={18} />
          </button>
        </div>

        {unlocked ? (
          <>
            <div className="my-5 rounded-lg border-2 border-dashed border-leaf-700 bg-white p-4 text-center">
              <Gift className="mx-auto text-leaf-700" />
              <p className="mt-2 text-sm text-ink/60">Mã đổi quà của bạn</p>
              <p className="mt-1 text-2xl font-black tracking-wide text-leaf-900">{journey.rewardCode}</p>
              <p className="mt-2 text-xs font-semibold text-kraft">Trạng thái: {journey.rewardStatus ?? "generated"}</p>
            </div>
            <p className="text-sm text-ink/70">Hãy gửi mã này cho BTC tại quầy tổng kết để nhận quà. Mã được giữ cố định trong passport của bạn.</p>
            <button type="button" onClick={onMarkSent} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-leaf-700 px-4 py-3 font-bold text-white hover:bg-leaf-900">
              <Send size={17} /> Đánh dấu đã gửi BTC
            </button>
          </>
        ) : (
          <>
            <div className="my-5 rounded-lg border-2 border-dashed border-kraft/50 bg-white p-4 text-center">
              <LockKeyhole className="mx-auto text-kraft" />
              <p className="mt-2 text-sm text-ink/60">Bạn cần hoàn thành các trạm bắt buộc và đóng dấu trạm cuối.</p>
              <p className="mt-1 text-lg font-black text-leaf-900">QR → Map → Minh chứng → Stamp → Passport → Reward</p>
            </div>
            <p className="text-sm text-ink/70">Mã không tạo lại khi reload. Sau khi mở khóa, bạn có thể gửi mã cho BTC để nhận quà.</p>
          </>
        )}
      </div>
    </div>
  );
}
