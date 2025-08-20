import React from "react";
import { useTodo } from "../contexts/TodoContext";

export default function TodoFilters() {
  const { filter, setFilter, categoryFilter, setCategoryFilter, clearCompleted, stats } = useTodo();
  const filters = [
    { value: "all", label: "All", icon: "📋" },
    { value: "active", label: "Active", icon: "⏳" },
    { value: "completed", label: "Completed", icon: "✅" },
    { value: "overdue", label: "Overdue", icon: "🚨" },
  ];
  const categories = ["all", "personal", "work", "health", "finance", "other"];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <div className="flex gap-3 text-sm">
          <span className="text-blue-500">Active: {stats.active}</span>
          <span className="text-green-500">Done: {stats.completed}</span>
          <span className="text-red-500">Overdue: {stats.overdue}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)} className={`px-3 py-1.5 rounded-lg text-sm ${filter === f.value ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}>
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full border rounded px-3 py-2">
        {categories.map((c) => (
          <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>
        ))}
      </select>

      <button onClick={clearCompleted} disabled={!stats.completed} className={`w-full px-4 py-2 rounded ${stats.completed ? "bg-red-500 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
        Clear Completed ({stats.completed})
      </button>
    </div>
  );
}
