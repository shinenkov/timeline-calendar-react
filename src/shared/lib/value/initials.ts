export const getInitials = (name: string): string => {
  if (!name) return "";

  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length === 0) return "";
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();

  return (nameParts[nameParts.length - 1][0] + nameParts[0][0]).toUpperCase();
};
