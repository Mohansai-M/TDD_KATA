import { StringCalculator } from "./StringCalculator";

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
});
