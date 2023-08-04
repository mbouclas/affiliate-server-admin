export function truncateString(str: string, num: number = 30, symbol = '...'): string {
    return str.length > num ? str.slice(0, num) + symbol : str;
}

export function moneyFormat(number: number) {
    return new Intl.NumberFormat('en-EL', { style: 'currency', currency: 'EUR' }).format(number);
}
