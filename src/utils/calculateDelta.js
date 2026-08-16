import { getDateFromObjectId } from "./getDateFromObjectId";

export function calculateDelta(items, getValue = () => 1, days = 30) {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const currentStart = now - days * dayMs;
    const previousStart = now - days * 2 * dayMs;

    let currentSum = 0;
    let previousSum = 0;

    items.forEach((item) => {
        const date = getDateFromObjectId(item.id);
        if (!date) return;
        const time = date.getTime();

        if (time >= currentStart && time <= now) {
            currentSum += getValue(item);
        } else if (time >= previousStart && time < currentStart) {
            previousSum += getValue(item);
        }
    });

    if (previousSum === 0) {
        return { delta: currentSum > 0 ? "100%" : "0%", positive: currentSum >= 0 };
    }

    const change = ((currentSum - previousSum) / previousSum) * 100;
    return {
        delta: `${Math.abs(change).toFixed(1)}%`,
        positive: change >= 0,
    };
}