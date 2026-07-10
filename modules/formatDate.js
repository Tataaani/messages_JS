export function formatDate(dateString) {
    const date = new Date(dateString)
    const d = ('0' + date.getDate()).slice(-2)
    const m = ('0' + (date.getMonth() + 1)).slice(-2)
    const y = date.getFullYear().toString().slice(-2)

    // Предотвращаем баг с минутами (например, 14:5 вместо 14:05)
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)

    return `${d}.${m}.${y} ${hours}:${minutes}`
}
