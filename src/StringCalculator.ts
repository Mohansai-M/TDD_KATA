function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export class StringCalculator {
  private callCount: number = 0;

  add(numbers: string): number {
    this.callCount++;
    if (numbers === "") return 0;

    let delimiter = /,|\n/; // default delimiters
    let numStr = numbers;

    // Handle custom delimiter cases
    if (numbers.startsWith("//")) {
      const multiDelimiterMatch = numbers.match(/^\/\/\[(.+?)\]\n/);
      const singleDelimiterMatch = numbers.match(/^\/\/(.)\n/);

      if (multiDelimiterMatch) {
        const customDelimiter = multiDelimiterMatch[1];
        delimiter = new RegExp(escapeRegExp(customDelimiter));
        numStr = numbers.slice(multiDelimiterMatch[0].length);
      } else if (singleDelimiterMatch) {
        const customDelimiter = singleDelimiterMatch[1];
        delimiter = new RegExp(`[${customDelimiter}\n]`);
        numStr = numbers.slice(singleDelimiterMatch[0].length);
      }
    }

    const tokens = numStr.split(delimiter);
    const parsedTokens = tokens
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n <= 1000);

    // Check for negatives
    const negatives = parsedTokens.filter((n) => n < 0);
    if (negatives.length > 0) {
      throw new Error(`negatives not allowed: ${negatives.join(",")}`);
    }

    return parsedTokens.reduce((a, b) => a + b, 0);
  }

  getCalledCount(): number {
    return this.callCount;
  }
}
