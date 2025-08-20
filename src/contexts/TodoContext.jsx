import React, { createContext, useContext, useMemo, useReducer } from "react";
import { isOverdue, isToday } from "../utils/dates";
import { useLocalStorage } from "../hooks/useLocalStorage"; // ✅ named import

const TodoContext = createContext(null);

const ACTIONS = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
  SET_FILTER: "SET_FILTER",
  SET_CATEGORY: "SET_CATEGORY",
  SET_DATE_FILTER: "SET_DATE_FILTER",
  REORDER: "REORDER",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
};

const initialState = {
  todos: [],
  filter: "all",
  category: "all",
  dateFilter: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const t = {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        priority: action.payload.priority || "medium",
        category: action.payload.category || "personal",
        dueDate: action.payload.dueDate || null,
        description: action.payload.description || "",
        createdAt: new Date().toISOString(),
      };
      return { ...state, todos: [t, ...state.todos] };
    }
    case ACTIONS.TOGGLE:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case ACTIONS.DELETE:
      return { ...state, todos: state.todos.filter((t) => t.id !== action.payload) };
    case ACTIONS.UPDATE:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        ),
      };
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };
    case ACTIONS.SET_CATEGORY:
      return { ...state, category: action.payload };
    case ACTIONS.SET_DATE_FILTER:
      return { ...state, dateFilter: action.payload };
    case ACTIONS.REORDER:
      return { ...state, todos: action.payload };
    case ACTIONS.CLEAR_COMPLETED:
      return { ...state, todos: state.todos.filter((t) => !t.completed) };
    default:
      return state;
  }
}

export const TodoProvider = ({ children }) => {
  // useLocalStorage replaces direct localStorage handling
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);
  const [state, dispatch] = useReducer(reducer, { ...initialState, todos: storedTodos });

  // persist todos whenever state.todos changes
  React.useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos, setStoredTodos]);

  // actions
  const addTodo = (data) => dispatch({ type: ACTIONS.ADD, payload: data });
  const toggleTodo = (id) => dispatch({ type: ACTIONS.TOGGLE, payload: id });
  const deleteTodo = (id) => dispatch({ type: ACTIONS.DELETE, payload: id });
  const updateTodo = (id, updates) =>
    dispatch({ type: ACTIONS.UPDATE, payload: { id, updates } });
  const setFilter = (f) => dispatch({ type: ACTIONS.SET_FILTER, payload: f });
  const setCategory = (c) => dispatch({ type: ACTIONS.SET_CATEGORY, payload: c });
  const setDateFilter = (d) => dispatch({ type: ACTIONS.SET_DATE_FILTER, payload: d });
  const clearCompleted = () => dispatch({ type: ACTIONS.CLEAR_COMPLETED });
  const reorderTodos = (next) => dispatch({ type: ACTIONS.REORDER, payload: next });

  // filtering helpers
  const isThisWeek = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const week = new Date();
    week.setDate(today.getDate() + 7);
    const d = new Date(dueDate);
    return d >= today && d <= week;
  };

  const filteredTodos = useMemo(() => {
    let list = state.todos;
    if (state.filter === "active") list = list.filter((t) => !t.completed);
    if (state.filter === "completed") list = list.filter((t) => t.completed);
    if (state.filter === "overdue")
      list = list.filter((t) => isOverdue(t.dueDate) && !t.completed);

    if (state.category !== "all") list = list.filter((t) => t.category === state.category);

    if (state.dateFilter === "today") list = list.filter((t) => isToday(t.dueDate));
    if (state.dateFilter === "this-week") list = list.filter((t) => isThisWeek(t.dueDate));
    if (state.dateFilter === "overdue") list = list.filter((t) => isOverdue(t.dueDate));

    return list;
  }, [state.todos, state.filter, state.category, state.dateFilter]);

  const stats = useMemo(() => {
    const total = state.todos.length;
    const completed = state.todos.filter((t) => t.completed).length;
    const active = total - completed;
    const overdue = state.todos.filter((t) => isOverdue(t.dueDate) && !t.completed).length;
    const today = state.todos.filter((t) => isToday(t.dueDate)).length;
    const thisWeek = state.todos.filter((t) => isThisWeek(t.dueDate)).length;
    const categories = state.todos.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {});
    const priorities = state.todos.reduce((acc, t) => {
      if (!t.completed) acc[t.priority] = (acc[t.priority] || 0) + 1;
      return acc;
    }, { high: 0, medium: 0, low: 0 });
    const completionRate = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, overdue, today, thisWeek, categories, priorities, completionRate };
  }, [state.todos]);

  const value = {
    todos: state.todos,
    filteredTodos,
    stats,
    filter: state.filter,
    categoryFilter: state.category,
    dateFilter: state.dateFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setFilter,
    setCategoryFilter: setCategory,
    setDateFilter,
    clearCompleted,
    reorderTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be used within TodoProvider");
  return ctx;
};
