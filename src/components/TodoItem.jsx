import React from "react";
import { useTodo } from "../contexts/TodoContext";
import { useClickOutside } from "../hooks/useClickOutside";
import { formatDate, isOverdue, isToday, isTomorrow, parseLocalDate } from "../utils/dates";
import { getPriority } from "../utils/priorities";

export default function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = React.useState(false);
  const [text, setText] = React.useState(todo.text);
  const [showPriority, setShowPriority] = React.useState(false);
  const [showDesc, setShowDesc] = React.useState(false);
  const inputRef = React.useRef(null);
  const menuRef = useClickOutside(() => setShowPriority(false));

  const dueDate = todo.dueDate ? parseLocalDate(todo.dueDate) : null;

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const save = () => {
    const trimmed = text.trim();
    if (trimmed && trimmed !== todo.text) updateTodo(todo.id, { text: trimmed });
    setIsEditing(false);
  };

  const p = getPriority(todo.priority);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <button onClick={() => toggleTodo(todo.id)} className={`w-5 h-5 flex items-center justify-center rounded border ${todo.completed ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-300"}`}>
            {todo.completed && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20,6 9,17 4,12"></polyline></svg>
            )}
          </button>

          <div className="flex flex-col gap-1">
            {isEditing ? (
              <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") setIsEditing(false); }} onBlur={save} className="border rounded px-2 py-1 text-sm" />
            ) : (
              <span onDoubleClick={() => setIsEditing(true)} className={`font-medium ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{todo.text}</span>
            )}

            <div className="flex gap-2 text-xs">
              {todo.category && <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600">{todo.category}</span>}
              <span onClick={() => setShowPriority((s) => !s)} style={{ backgroundColor: p.bg, color: p.color }} className="px-2 py-0.5 rounded cursor-pointer">{p.label}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 text-gray-500">
          {todo.description && (
            <button onClick={() => setShowDesc((s) => !s)} className="hover:text-indigo-600">ℹ</button>
          )}
          <button onClick={() => setIsEditing(true)} className="hover:text-indigo-600">✏</button>
          <button onClick={() => deleteTodo(todo.id)} className="hover:text-red-500">🗑</button>
        </div>
      </div>

      {showPriority && (
        <div ref={menuRef} className="mt-2 flex gap-2 bg-white shadow rounded p-2 border">
          {["low", "medium", "high"].map((pp) => (
            <button key={pp} onClick={() => { updateTodo(todo.id, { priority: pp }); setShowPriority(false); }} className="px-2 py-1 rounded border hover:bg-gray-100 text-sm">
              {pp[0].toUpperCase() + pp.slice(1)}
            </button>
          ))}
        </div>
      )}

      {dueDate && (
        <div className={`mt-2 text-xs ${isOverdue(dueDate) && !todo.completed ? "text-red-500 font-semibold" : isToday(dueDate) ? "text-green-600 font-medium" : "text-gray-500"}`}>
          📅 Due: {formatDate(dueDate)} {isOverdue(dueDate) && !todo.completed && <span>(Overdue!)</span>}
        </div>
      )}

      {showDesc && todo.description && <div className="mt-2 text-sm text-gray-600 border-t pt-2">{todo.description}</div>}

      <div className="mt-2 text-[11px] text-gray-400">Created: {formatDate(todo.createdAt)}</div>
    </div>
  );
}