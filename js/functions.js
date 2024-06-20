const isValidStringLength = (str, maxLength) => str.length <= maxLength;

// Строка короче 20 символов
isValidStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
isValidStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
isValidStringLength('проверяемая строка', 10); // false

const isPalindrome = (str) => {
  const normalizeStr = str.replaceAll(' ', '').toLowerCase();
  const reversedNormalizeStr = normalizeStr.split('').reverse().join('');

  return normalizeStr === reversedNormalizeStr;
};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true

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

extractDigitsToNumber('2023 год'); // 2023
extractDigitsToNumber('ECMAScript 2022'); // 2022
extractDigitsToNumber('1 кефир, 0.5 батона'); // 105
extractDigitsToNumber('агент 007'); // 7
extractDigitsToNumber('а я томат'); // NaN
extractDigitsToNumber(2023); // 2023
extractDigitsToNumber(-1); // 1
extractDigitsToNumber(1.5); // 15
