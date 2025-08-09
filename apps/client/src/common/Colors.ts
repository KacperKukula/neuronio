export const COLORS = [
    '#00b894', // Green
    '#d63031', // Red
    '#0984e3', // Blue
//    '#fdcb6e', // Yellow
    '#6c5ce7', // Violet
    '#e17055', // Orange
]

export function getRandomColor() {
    const position = Math.floor(Math.random() * COLORS.length)

    return COLORS[position];
}