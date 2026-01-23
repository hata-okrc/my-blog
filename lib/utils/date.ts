export function formatDate(dateString: string): string {
  if (!dateString) return "";
  return dateString.replace(/-/g, ".");
}

export function formatDateToISO(date: Date): string {
  const year: string = String(date.getFullYear());
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const day: string = String(date.getDate()).padStart(2, "0");
  // const hour: string = String(date.getHours()).padStart(2, '0');
  // const minute: string = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
