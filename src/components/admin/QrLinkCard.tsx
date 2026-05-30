import { Copy, ExternalLink, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import type { RouteStop } from "../../types/journey";
import { buildJourneyMapPath, buildQrUrl } from "../../services/qr";

type QrLinkCardProps = {
  workshopId: string;
  stop?: RouteStop;
  label?: string;
};

export function QrLinkCard({ workshopId, stop, label }: QrLinkCardProps) {
  const path = buildJourneyMapPath(workshopId, stop?.id);
  const url = buildQrUrl(workshopId, stop?.id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      window.alert("Đã copy link QR demo.");
    } catch {
      window.prompt("Copy link này để tạo QR:", url);
    }
  };

  return (
    <article className="rounded-lg border border-leaf-900/10 bg-paper p-3">
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-leaf-900/10 bg-white text-leaf-700">
          <QrCode size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-leaf-900">{label ?? stop?.title ?? "QR vào bản đồ"}</p>
          {stop && <p className="mt-1 text-xs text-ink/55">Mở trực tiếp {stop.subtitle} khi người tham gia quét tại trạm.</p>}
          <p className="mt-2 truncate rounded bg-white px-2 py-1 text-xs text-ink/65">{url}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={handleCopy} className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-bold text-leaf-900 hover:bg-leaf-50">
              <Copy size={14} /> Copy link
            </button>
            <Link to={path} className="inline-flex items-center gap-1 rounded-lg bg-leaf-700 px-3 py-2 text-xs font-bold text-white hover:bg-leaf-900">
              <ExternalLink size={14} /> Test QR
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
