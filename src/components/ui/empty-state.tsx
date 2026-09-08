import { Plus, SearchX, UsersRound } from "lucide-react";
import { Button } from "./button";

export function EmptyState({
  filtered,
  onClear,
  onAdd,
}: {
  filtered: boolean;
  onClear?: () => void;
  onAdd?: () => void;
}) {
  const Icon = filtered ? SearchX : UsersRound;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:py-20">
      <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-slate-500 shadow-sm">
        <Icon className="h-7 w-7 text-slate-600" />
      </div>

      <h3 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
        {filtered ? "No leads found matching criteria" : "No leads in pipeline"}
      </h3>

      <p className="mt-1.5 max-w-sm text-sm text-slate-500 leading-relaxed">
        {filtered
          ? "We couldn't find any leads matching your current search or filters. Try adjusting or clearing them."
          : "Get started by adding your first lead to begin tracking conversations and conversions."}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {filtered && onClear ? (
          <Button variant="outline" onClick={onClear}>
            Clear all filters
          </Button>
        ) : null}
        {!filtered && onAdd ? (
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4" />
            Add new lead
          </Button>
        ) : null}
      </div>
    </div>
  );
}
