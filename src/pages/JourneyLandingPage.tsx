import { CalendarDays, Map, NotebookTabs, Play, Recycle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QrLinkCard } from "../components/admin/QrLinkCard";
import { PageShell } from "../components/layout/PageShell";
import { getStopsByWorkshop } from "../data/routeStops";
import { getWorkshopById } from "../data/workshops";
import { loadJourney, saveJourney, updateProfile } from "../services/journeyStorage";
import type { NotebookChoice, ParticipantJourney } from "../types/journey";
import { formatVietnameseDate } from "../utils/date";
import { getProgress } from "../utils/progress";

export function JourneyLandingPage() {
  const { workshopId = "green-paper-2026-06-13" } = useParams();
  const navigate = useNavigate();
  const workshop = getWorkshopById(workshopId);
  const stops = getStopsByWorkshop(workshop.id);
  const [journey, setJourney] = useState<ParticipantJourney>(() => loadJourney(workshop.id));
  const progress = getProgress(journey, stops);

  useEffect(() => {
    saveJourney(journey);
  }, [journey]);

  const handleProfile = (displayName: string, notebookChoice?: NotebookChoice) => {
    setJourney(updateProfile(workshop.id, { displayName, notebookChoice }));
  };

  return (
    <PageShell workshopId={workshop.id}>
      <main className="mx-auto grid min-h-[calc(100vh-65px)] max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[1.08fr_0.92fr]">
        <section>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-bold text-leaf-900 shadow-sm">
            <Recycle size={16} /> QR là cổng vào hành trình
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-leaf-900 md:text-6xl">
            Green Journey Map
          </h1>
          <p className="mt-3 text-2xl font-bold text-kraft">Hành Trình Tái Sinh Giấy</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">
            Bạn đang bước vào Hành Trình Tái Sinh Giấy. Hoàn thành các trạm, đóng dấu hành trình và nhận quà từ BTC.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button onClick={() => navigate(`/journey/${workshop.id}/map`)} className="flex items-center justify-center gap-2 rounded-lg bg-leaf-700 px-4 py-3 font-bold text-white hover:bg-leaf-900">
              <Play size={18} /> Bắt đầu
            </button>
            <Link to={`/journey/${workshop.id}/map`} className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 font-bold text-leaf-900 hover:bg-leaf-50">
              <Map size={18} /> Xem bản đồ
            </Link>
            <Link to={`/journey/${workshop.id}/passport`} className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 font-bold text-leaf-900 hover:bg-leaf-50">
              <NotebookTabs size={18} /> Passport
            </Link>
          </div>
        </section>

        <aside className="rounded-lg border border-leaf-900/10 bg-white/85 p-5 shadow-soft">
          <div className="flex items-center gap-3 text-leaf-900">
            <CalendarDays />
            <div>
              <p className="text-sm font-semibold text-kraft">Workshop gần nhất</p>
              <h2 className="text-xl font-black">{workshop.topic}</h2>
            </div>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <div><dt className="font-bold">Ngày</dt><dd>{formatVietnameseDate(workshop.date)}</dd></div>
            <div><dt className="font-bold">Địa điểm</dt><dd>{workshop.locationName}</dd></div>
            <div><dt className="font-bold">Tần suất</dt><dd>{workshop.frequency}</dd></div>
            <div><dt className="font-bold">Tiến độ của bạn</dt><dd>{progress.completed}/{progress.total} trạm</dd></div>
          </dl>
          <div className="mt-5 space-y-3 border-t border-leaf-900/10 pt-5">
            <input
              defaultValue={journey.displayName}
              onBlur={(event) => handleProfile(event.target.value, journey.notebookChoice)}
              placeholder="Tên hiển thị của bạn, không bắt buộc"
              className="w-full rounded-lg border border-leaf-900/10 bg-paper px-3 py-3 text-sm outline-none focus:border-leaf-700"
            />
            <select
              value={journey.notebookChoice ?? "undecided"}
              onChange={(event) => handleProfile(journey.displayName ?? "", event.target.value as NotebookChoice)}
              className="w-full rounded-lg border border-leaf-900/10 bg-paper px-3 py-3 text-sm outline-none focus:border-leaf-700"
            >
              <option value="take_home">Tôi muốn mang vở về</option>
              <option value="donate">Tôi muốn gửi vở cho BTC đi thiện nguyện</option>
              <option value="undecided">Tôi chưa quyết định</option>
            </select>
          </div>
          <div className="mt-5 border-t border-leaf-900/10 pt-5">
            <QrLinkCard workshopId={workshop.id} label="Link QR tổng cho workshop" />
          </div>
        </aside>
      </main>
    </PageShell>
  );
}
