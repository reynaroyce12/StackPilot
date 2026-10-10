"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Cloud,
  ShieldCheck,
  KeyRound,
  Network,
  ClipboardCheck,
  Settings2,
} from "lucide-react";

interface Props {
  task: string;
  index: number;
  completed: boolean;
  disabled?: boolean;
  description: string;
  details: string;
  onToggle: () => void;
}

const taskIcons = [
  Cloud,
  ShieldCheck,
  KeyRound,
  Network,
  ClipboardCheck,
  Settings2,
];

export default function ChecklistTask({
  task,
  index,
  completed,
  disabled = false,
  description,
  details,
  onToggle,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const Icon = taskIcons[index % taskIcons.length];

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors ${
        completed
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-slate-200 bg-white hover:border-blue-200"
      }`}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        {/* Checkbox */}
        <label className="flex shrink-0 cursor-pointer items-center">
          <input
            type="checkbox"
            checked={completed}
            disabled={disabled}
            onChange={onToggle}
            aria-label={`Mark ${task} as ${completed ? "incomplete" : "complete"}`}
            className="peer sr-only"
          />

          <span
            aria-hidden="true"
            className={`flex h-5 w-5 items-center justify-center rounded border peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 ${
              completed
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 bg-white"
            }`}
          >
            {completed && <Check size={13} strokeWidth={3} />}
          </span>
        </label>

        {/* Task icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50">
          <Icon size={16} className="text-slate-600" />
        </div>

        {/* Task information */}
        <div className="min-w-0 flex-1">
          <p
            className={`text-xs font-semibold leading-5 ${
              completed ? "text-slate-600" : "text-slate-900"
            }`}
          >
            {task}
          </p>

          <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
            {description}
          </p>
        </div>

        {/* Expand guidance */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Hide" : "Show"} guidance for ${task}`}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
        >
          {expanded ? (
            <ChevronDown size={17} />
          ) : (
            <ChevronRight size={17} />
          )}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-blue-50/40 px-4 py-3">
          <p className="text-xs font-semibold text-slate-800">
            Implementation guidance
          </p>

          <p className="mt-1 text-[14px] font-medium leading-6 text-[#484848]">
            {details}
          </p>
        </div>
      )}
    </div>
  );
}