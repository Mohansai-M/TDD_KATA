export class StringCalculator {
  add(numbers: string): number {
    if (numbers === "") return 0;

    let delimiter = /,|\n/; // default delimiters
    let numStr = numbers;

    // If input starts with custom delimiter line
    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n");
      const delimiterLine = parts[0];
      numStr = parts.slice(1).join("\n");

      const customDelimiter = delimiterLine[2];
      delimiter = new RegExp(`[${customDelimiter}|\n]`);
    }

    const tokens = numStr.split(delimiter);
    const parsedTokens = tokens.map((n) => parseInt(n.trim()));

    // Check for negatives
    const negatives = parsedTokens.filter((n) => n < 0);
    if (negatives.length > 0) {
       throw new Error(`negatives not allowed: ${negatives.join(",")}`);
    }

   return parsedTokens.reduce((a, b) => a + b, 0);
  }
}
