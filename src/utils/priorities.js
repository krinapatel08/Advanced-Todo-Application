export const PRIORITIES = {
  low: { label: "Low", color: "#10b981", bg: "#d1fae5", weight: 1 },
  medium: { label: "Medium", color: "#f59e0b", bg: "#fef3c7", weight: 2 },
  high: { label: "High", color: "#ef4444", bg: "#fee2e2", weight: 3 },
};

export const getPriority = (p = "medium") => PRIORITIES[p] || PRIORITIES.medium;

export const compareByPriority = (a, b) => getPriority(b.priority).weight - getPriority(a.priority).weight;