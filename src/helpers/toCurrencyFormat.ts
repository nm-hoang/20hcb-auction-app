export function toCurrencyFormat(value: string | number) {
  return Number(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
