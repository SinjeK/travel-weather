export function isValidDateRange(startDate: Date, endDate: Date) {
    if (startDate.getFullYear() > endDate.getFullYear()) {
        return false
    } else if (startDate.getFullYear() < endDate.getFullYear()) {
        return true
    }

    // years are the same
    if (startDate.getMonth() > endDate.getMonth()) {
        return false
    } else if (startDate.getMonth() < endDate.getMonth()) {
        return true
    }

    // months are the same
    if (startDate.getDate() > endDate.getDate()) {
        return false
    } else if (startDate.getDate() < endDate.getDate()) {
        return true
    }

    return true
}

export const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
