import { StringCalculator } from "../src/StringCalculator";

describe("StringCalculator", () => {
  it("returns 0 for an empty string", () => {
    const calculator = new StringCalculator();
    expect(calculator.add("")).toBe(0);
  });
  it('returns 1 for "1"', () => {
    const calculator = new StringCalculator();
    expect(calculator.add("1")).toBe(1);
  });
  it('returns 3 for "1,2"', () => {
    const calculator = new StringCalculator();
    expect(calculator.add("1,2")).toBe(3);
  });
  it('returns 6 for "1,2,3"', () => {
    const calculator = new StringCalculator();
    expect(calculator.add("1,2,3,6,7,8,9,10,203,505,300")).toBe(1054);
  });
  it('returns 6 for "1\\n2,3"', () => {
    const calculator = new StringCalculator();
    expect(calculator.add("1\n2,3")).toBe(6);
  });
  it('supports custom delimiter ";" as in "//;\\n1;2"', () => {
    const calculator = new StringCalculator();
    expect(calculator.add("//;\n1;2")).toBe(3);
  });
  it('supports custom delimiter ";" as in "//;\n1;2\n3"', () => {
    const calculator = new StringCalculator();
    expect(calculator.add("//;\n1;2\n3")).toBe(6);
  });
  it("throws an error with all negative numbers listed", () => {
    const calculator = new StringCalculator();
    expect(() => calculator.add("1,-2,3,-5")).toThrow(
      "negatives not allowed: -2,-5"
    );
  });
  it("returns the correct number of times add() was called", () => {
    const calculator = new StringCalculator();
    calculator.add("1,2");
    calculator.add("3,4,5");
    expect(calculator.getCalledCount()).toBe(2);
  });
  it("ignores numbers greater than 1000", () => {
    const calculator = new StringCalculator();
    expect(calculator.add("2,1001")).toBe(2);
    expect(calculator.add("1000,1")).toBe(1001); // ✅ 1000 is still valid
  });
  it("supports delimiters of any length", () => {
    const calculator = new StringCalculator();
    expect(calculator.add("//[***]\n1***2***3")).toBe(6);
    expect(calculator.add("//[*]\n1*2*3")).toBe(6);
  });
});
