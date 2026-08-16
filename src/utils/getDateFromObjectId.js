export function getDateFromObjectId(id) {
    if (!id || typeof id !== "string") return null;
    if (!/^[0-9a-fA-F]{24}$/.test(id)) return null;
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    return new Date(timestamp);
}