/**

5. Longest Palindromic Substring

Given a string s, return the longest palindromic substring in s.
 
Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 
Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.

**/

function longestPalindrome(s: string): string {
    if (s.length < 2) return s;

    let start = 0;
    let maxLen = 1;

    function expand(left: number, right: number): void {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const len = right - left + 1;
            if (len > maxLen) {
                start = left;
                maxLen = len;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        // Odd length palindrome
        expand(i, i);

        // Even length palindrome
        expand(i, i + 1);
    }

    return s.substring(start, start + maxLen);
}
