const isValidStringLength = (str, maxLength) => str.length <= maxLength;

const isPalindrome = (str) => {
  const normalizeStr = str.replaceAll(' ', '').toLowerCase();
  const reversedNormalizeStr = normalizeStr.split('').reverse().join('');

  return normalizeStr === reversedNormalizeStr;
};

const extractDigitsToNumber = (value) => {
  const normalizeValue = typeof value === 'number' ? String(value) : value;

  const result = normalizeValue
    .split('')
    .reduce((acc, char) => {
      const normalizeChar = parseInt(char, 10);
      if (!Number.isNaN(normalizeChar)) {
        return `${acc}${normalizeChar}`;
      }
      return acc;
    }, '');


  return result.length > 0 ? Number(result) : NaN;
};
