import {
  Layers3,
  Search,
  Clock3,
  Bookmark,
  Blocks,
  BookOpen,
  Database,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white p-5 lg:flex lg:flex-col">
      <div className="mb-10 flex items-center gap-3">
        <div className="rounded-lg bg-blue-600 p-2">
          <Layers3 className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-950">
          StackPilot
        </span>
      </div>

      <nav className="space-y-1 text-sm">
        <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-3 font-medium text-blue-700">
          <Search size={18} /> New search
        </div>
        <div className="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-600">
          <Clock3 size={18} /> Recent companies
        </div>
        <div className="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-600">
          <Bookmark size={18} /> Saved reports
        </div>
        <div className="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-600">
          <Blocks size={18} /> Integration templates
        </div>
      </nav>

      <div className="mt-8 border-t border-slate-200 pt-5">
        <p className="mb-3 px-3 text-xs font-medium text-slate-400">
          RESOURCES
        </p>
        <div className="flex items-center gap-3 px-3 py-3 text-sm text-slate-600">
          <BookOpen size={18} /> How it works
        </div>
        <div className="flex items-center gap-3 px-3 py-3 text-sm text-slate-600">
          <Database size={18} /> Powered by Clay
        </div>
      </div>

      <div className="mt-auto border-t border-slate-200 pt-5 text-xs text-slate-500">
        Technology intelligence powered by Clay
      </div>
    </aside>
  );
}