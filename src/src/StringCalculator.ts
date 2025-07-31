export class StringCalculator {
  add(numbers: string): number {
    if (numbers === "") return 0;

    const parts = numbers.split(/,|\n/); 
    const total = parts.map((n) => parseInt(n.trim())).reduce((a, b) => a + b, 0);

    return total;
  }
}
