export function convertToPrice(rawPrice: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rawPrice);
}
