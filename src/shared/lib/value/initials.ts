export const getInitials = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return "";

  const nameParts = trimmed.split(/\s+/);
  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase();
  }

  return (nameParts[nameParts.length - 1][0] + nameParts[0][0]).toUpperCase();
};
