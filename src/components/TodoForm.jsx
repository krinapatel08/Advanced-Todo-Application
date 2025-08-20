import React from "react";
import { useTodo } from "../contexts/TodoContext";

const CATEGORIES = ["personal", "work", "health", "finance", "education", "shopping", "travel", "other"];

export default function TodoForm() {
  const { addTodo } = useTodo();
  const [form, setForm] = React.useState({ text: "", priority: "medium", category: "personal", dueDate: "", description: "" });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.text.trim()) return;
    addTodo({ ...form, text: form.text.trim(), dueDate: form.dueDate || null, description: form.description.trim() });
    setForm({ text: "", priority: "medium", category: "personal", dueDate: "", description: "" });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex gap-3">
        <input value={form.text} onChange={(e) => set("text", e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Add a new task..." />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50" disabled={!form.text.trim()}>+ Add</button>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <select value={form.priority} onChange={(e) => set("priority", e.target.value)} className="border rounded px-3 py-2">
          {["low", "medium", "high"].map((p) => (
            <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>
          ))}
        </select>
        <select value={form.category} onChange={(e) => set("category", e.target.value)} className="border rounded px-3 py-2">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
        <input type="date" value={form.dueDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => set("dueDate", e.target.value)} className="border rounded px-3 py-2" />
      </div>
      <textarea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Description (optional)" />
    </form>
  );
}