import { Sprout } from "lucide-react";
import type { ParticipantJourney, RouteStop } from "../../types/journey";
import { getProgress } from "../../utils/progress";

type ProgressCardProps = {
  journey: ParticipantJourney;
  stops: RouteStop[];
};

export function ProgressCard({ journey, stops }: ProgressCardProps) {
  const progress = getProgress(journey, stops);

  return (
    <section className="rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-kraft">Tiến độ hành trình</p>
          <h2 className="mt-1 text-2xl font-bold text-leaf-900">{progress.completed}/{progress.total} trạm đã hoàn thành</h2>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-full bg-leaf-100 text-leaf-700">
          <Sprout size={22} />
        </div>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-leaf-100">
        <div className="h-full rounded-full bg-leaf-700 transition-all" style={{ width: `${progress.percent}%` }} />
      </div>
      <p className="mt-3 text-sm text-ink/70">
        {progress.isComplete ? "Bạn đã mở khóa phần thưởng xanh." : "Mỗi dấu mộc là một bước đưa giấy cũ trở lại đời sống."}
      </p>
    </section>
  );
}
