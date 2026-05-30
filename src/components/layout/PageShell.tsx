import { Leaf, Map, NotebookTabs, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";

type PageShellProps = {
  children: React.ReactNode;
  workshopId?: string;
};

export function PageShell({ children, workshopId = "green-paper-2026-06-13" }: PageShellProps) {
  return (
    <div className="min-h-screen paper-texture text-ink">
      <header className="sticky top-0 z-40 border-b border-leaf-900/10 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <NavLink to={`/journey/${workshopId}`} className="flex items-center gap-2 font-bold text-leaf-900">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf-700 text-white">
              <Leaf size={18} />
            </span>
            <span>Green Journey Map</span>
          </NavLink>
          <nav className="flex items-center gap-1 text-sm">
            <NavLink className="rounded-full px-3 py-2 hover:bg-white/80" to={`/journey/${workshopId}/map`}>
              <span className="flex items-center gap-1"><Map size={16} /> Map</span>
            </NavLink>
            <NavLink className="rounded-full px-3 py-2 hover:bg-white/80" to={`/journey/${workshopId}/passport`}>
              <span className="flex items-center gap-1"><NotebookTabs size={16} /> Passport</span>
            </NavLink>
            <NavLink className="rounded-full px-3 py-2 hover:bg-white/80" to="/admin">
              <span className="flex items-center gap-1"><ShieldCheck size={16} /> Admin</span>
            </NavLink>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
