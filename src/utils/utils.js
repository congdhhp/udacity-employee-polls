export function formatDate(timestamp) {
  if (!timestamp) {
    return 'Invalid date';
  }

  const date = new Date(timestamp);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  // Format the time (HH:mm AM/PM) and date (MM/DD/YYYY)
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);

  return `${formattedTime} | ${formattedDate}`;
}
