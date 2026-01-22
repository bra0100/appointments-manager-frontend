export function formatDate(date) {
    return new Date(date).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

export function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
}
