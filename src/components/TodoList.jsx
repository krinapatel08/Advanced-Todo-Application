import React from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTodo } from "../contexts/TodoContext";
import SortableTodoItem from "./SortableTodoItem";

export default function TodoList() {
  const { filteredTodos, reorderTodos } = useTodo();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = filteredTodos.findIndex((t) => t.id === active.id);
    const newIndex = filteredTodos.findIndex((t) => t.id === over.id);
    reorderTodos(arrayMove(filteredTodos, oldIndex, newIndex));
  };

  if (!filteredTodos.length) {
    return (
      <div className="text-center py-6 text-gray-500">
        <div className="text-3xl">📝</div>
        <p className="mt-2 font-medium">No tasks found</p>
        <p className="text-sm">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={filteredTodos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {filteredTodos.map((todo) => (
          <SortableTodoItem key={todo.id} todo={todo} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
