export default function getNoun(number: number, nouns: string[]) {
    let n = Math.abs(number)
    n %= 100
    if (n >= 5 && n <= 20) {
        return nouns[2]
    }
    n %= 10
    if (n === 1) {
        return nouns[0]
    }
    if (n >= 2 && n <= 4) {
        return nouns[1]
    }
    return nouns[2]
}
