export function util(length: number): string {
    const a = "A".charCodeAt(0);
    const arr = Array.from({ length }, () => Math.floor(Math.random() * 26) + a);
    return String.fromCharCode(...arr);
}
