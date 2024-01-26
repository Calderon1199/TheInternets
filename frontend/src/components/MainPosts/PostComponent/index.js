import PostTile from './PostComponent';

export function calculateTimeDifference(createdAt, updatedAt) {
    const createdAtDate = new Date(createdAt);
    const updatedAtDate = new Date(updatedAt);
    const currentDate = new Date();

    const timeDifference = currentDate - (updatedAtDate > createdAtDate ? updatedAtDate : createdAtDate);
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const timeAgo = (value, unit) => `${value} ${unit}${value !== 1 ? 's' : ''} ago`;

    if (days > 0) {
        return `${timeAgo(days, 'day')} ${updatedAtDate > createdAtDate ? '(edited)' : ''}`;
    } else if (hours > 0) {
        return `${timeAgo(hours, 'hour')} ${updatedAtDate > createdAtDate ? '(edited)' : ''}`;
    } else if (minutes > 0) {
        return `${timeAgo(minutes, 'minute')} ${updatedAtDate > createdAtDate ? '(edited)' : ''}`;
    } else if (seconds > 0) {
        return `${timeAgo(seconds, 'second')} ${updatedAtDate > createdAtDate ? '(edited)' : ''}`;
    } else {
        return `Just now`;
    }
}

export default PostTile;
