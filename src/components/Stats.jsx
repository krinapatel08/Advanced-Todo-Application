import React from "react";
import { useTodo } from "../contexts/TodoContext";

export default function Stats() {
  const { stats } = useTodo();
  const cards = [
    { t: "Total Tasks", v: stats.total, c: "bg-indigo-500", i: "📋" },
    { t: "Completed", v: stats.completed, c: "bg-green-500", i: "✅" },
    { t: "Active", v: stats.active, c: "bg-yellow-500", i: "⏳" },
    { t: "Overdue", v: stats.overdue, c: "bg-red-500", i: "🚨" },
    { t: "Due Today", v: stats.today, c: "bg-purple-500", i: "📅" },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">📊 Task Overview</h2>
        <div className="bg-indigo-50 border border-indigo-200 rounded-md px-3 py-1.5 text-indigo-700 font-semibold text-sm">Completion Rate: {stats.completionRate}%</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl text-white ${s.c}`}>{s.i}</div>
            <div className="mt-3 text-xl font-bold text-gray-800">{s.v}</div>
            <div className="text-gray-500 text-sm">{s.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}