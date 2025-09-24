/**
166. Fraction to Recurring Decimal

Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.

If the fractional part is repeating, enclose the repeating part in parentheses.

If multiple answers are possible, return any of them.

It is guaranteed that the length of the answer string is less than 104 for all the given inputs.

 

Example 1:

Input: numerator = 1, denominator = 2
Output: "0.5"
Example 2:

Input: numerator = 2, denominator = 1
Output: "2"
Example 3:

Input: numerator = 4, denominator = 333
Output: "0.(012)"
 

Constraints:

-231 <= numerator, denominator <= 231 - 1
denominator != 0
**/

function fractionToDecimal(numerator: number, denominator: number): string {
    if (numerator === 0) return "0"; // Zero divided by anything is 0

    let result = "";

    // Determine the sign of the result
    const isNegative = (numerator < 0) !== (denominator < 0);
    if (isNegative) result += "-";

    // Work with absolute values to avoid negative issues
    const num = Math.abs(numerator);
    const den = Math.abs(denominator);

    // Append the integer part
    const integerPart = Math.floor(num / den);
    result += integerPart.toString();

    let remainder = num % den;
    if (remainder === 0) return result; // No fractional part

    result += ".";

    // Map to store previously seen remainders and their corresponding index in the result string
    const remainderMap = new Map<number, number>();

    // Process the fractional part
    while (remainder !== 0) {
        // If we have seen this remainder before, we have a repeating cycle
        if (remainderMap.has(remainder)) {
            const repeatIndex = remainderMap.get(remainder)!;
            const nonRepeating = result.slice(0, repeatIndex);
            const repeating = result.slice(repeatIndex);
            return `${nonRepeating}(${repeating})`;
        }

        // Store the current remainder with its position in the result string
        remainderMap.set(remainder, result.length);

        remainder *= 10; // Shift decimal left
        const digit = Math.floor(remainder / den);
        result += digit.toString();

        remainder %= den; // Update remainder
    }

    return result; // If no repetition found
}
