export const parseLocalDate = (dateString) => {
  if (!dateString) return null;
  if (dateString.includes("T")) return new Date(dateString);
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
};

export const formatDate = (dateLike) => {
  const d = new Date(dateLike);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  const diffDays = (d - today) / (1000 * 60 * 60 * 24);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  return d.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};

export const isToday = (dateString) => {
  if (!dateString) return false;
  const a = new Date(dateString);
  const b = new Date();
  return a.toDateString() === b.toDateString();
};

export const isTomorrow = (dateString) => {
  if (!dateString) return false;
  const a = new Date(dateString);
  const b = new Date();
  b.setDate(b.getDate() + 1);
  return a.toDateString() === b.toDateString();
};