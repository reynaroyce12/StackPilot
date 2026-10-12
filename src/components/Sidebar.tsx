import Link from "next/link";
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
        <aside className="hidden min-h-screen w-72 shrink-0 border-r border-[#f9f8f6] bg-[#f9f8f6] p-5 lg:flex lg:flex-col">
            <Link
                href="/"
                aria-label="Return to the StackPilot landing page"
                className="mb-10 flex items-center gap-3 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-4 focus-visible:ring-blue-200"
            >
                <div className="rounded-lg bg-blue-600 p-2">
                    <Layers3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-[22px] font-bold tracking-[-0.04em] text-[#171717]">
                    StackPilot
                </span>
            </Link>

            <nav className="space-y-1 text-[15px] font-semibold tracking-[-0.035em]">
                <div className="flex items-center gap-3 rounded-lg bg-white px-3 py-2.5 font-semibold text-[#171717] ring-1 ring-[#E5E1DA]">
                    <Search size={19}
                        strokeWidth={2.3} /> New search
                </div>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#171717]">
                    <Clock3 size={19}
                        strokeWidth={2.3} /> Recent companies
                </div>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#171717]">
                    <Bookmark size={19}
                        strokeWidth={2.3} /> Saved reports
                </div>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#171717]">
                    <Blocks size={19}
                        strokeWidth={2.3} /> Integration templates
                </div>
            </nav>

            <div className="mt-8 border-t border-slate-200 pt-5">
                <p className="mb-3 px-3 text-[12px] font-semibold tracking-[0.04em] text-[#888580]">
                    RESOURCES
                </p>
                <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#171717]">
                    <BookOpen size={19}
                        strokeWidth={2.3} /> How it works
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#171717]">
                    <Database size={19}
                        strokeWidth={2.3} /> Powered by Clay
                </div>
            </div>

            <div className="mt-auto border-t border-slate-200 pt-5 text-[13px] font-medium text-[#686868]">
                Technology intelligence powered by Clay
            </div>
        </aside>
    );
}
