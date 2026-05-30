import { Check, Leaf } from "lucide-react";

type StampBadgeProps = {
  label: string;
  completed: boolean;
  order?: number;
};

export function StampBadge({ label, completed, order }: StampBadgeProps) {
  return (
    <div className={`stamp-pop flex min-h-28 flex-col items-center justify-center rounded-lg border-2 border-dashed p-3 text-center ${
      completed ? "border-leaf-700 bg-leaf-50 text-leaf-900" : "border-kraft/40 bg-white/60 text-ink/45"
    }`}>
      <div className={`mb-2 grid h-11 w-11 place-items-center rounded-full ${completed ? "bg-leaf-700 text-white" : "bg-kraft/10"}`}>
        {completed ? <Check size={20} /> : <Leaf size={18} />}
      </div>
      <p className="text-xs uppercase tracking-wide">Trạm {order}</p>
      <p className="text-sm font-bold">{label}</p>
    </div>
  );
}
