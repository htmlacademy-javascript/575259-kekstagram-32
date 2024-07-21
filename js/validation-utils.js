const HASH_TAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASH_TAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const VALIDATION_ERROR_MESSAGE = {
  tooManyHashtagsMessage: 'Нельзя указать больше пяти хэштегов',
  hashtagsLengthTooLongMessage: 'Длина хэштега не должна превышать 20 символов',
  hashtagsAreNotUniqueMessage: 'Хэштеги не должны повторяться',
  hashtagsAreNotCorrectMessage: 'Хэштег некорректный',
  hashtagsAreNotSpacedMessage: 'Хэштеги должны быть разделены пробелами',
  commentTooLongMessage: 'Длина комментария не должна превышать 140 символов',
  hashtagsMustStartWithHashMessage: 'Каждый хэштэг должен начинаться с #',
};

let validationHashtagsErrorMessage = '';
let validationCommentErrorMessage = '';

const isHashtagsSpaced = (hashtags) => {
  const isValid = hashtags.length > 0;

  if (!isValid) {
    validationHashtagsErrorMessage = VALIDATION_ERROR_MESSAGE.hashtagsAreNotSpacedMessage;
  }

  return isValid;
};
const isHashtagsStartsWithHash = (hashtags) => {
  const isValid = hashtags.every((hastag) => hastag.startsWith('#'));

  if (!isValid) {
    validationHashtagsErrorMessage = VALIDATION_ERROR_MESSAGE.hashtagsMustStartWithHashMessage;
  }

  return isValid;
};

const isHastagLengthCorrect = (hastags) => {
  const isValid = hastags.every((hastag) => hastag.length <= MAX_HASHTAG_LENGTH);

  if (!isValid) {
    validationHashtagsErrorMessage = VALIDATION_ERROR_MESSAGE.hashtagsLengthTooLongMessage;
  }

  return isValid;
};

const isHashtagsLengthCorrect = (hashtags) => {
  const isValid = hashtags.length <= MAX_HASH_TAG_COUNT;

  if (!isValid) {
    validationHashtagsErrorMessage = VALIDATION_ERROR_MESSAGE.tooManyHashtagsMessage;
  }

  return isValid;
};

const isHashtagsUnique = (hashtags) => {
  const isValid = new Set(hashtags).size === hashtags.length;

  if (!isValid) {
    validationHashtagsErrorMessage = VALIDATION_ERROR_MESSAGE.hashtagsAreNotUniqueMessage;
  }

  return isValid;
};
const isHashtagsCorrect = (hashtags) => {
  const isValid = hashtags.every((hastag) => HASH_TAG_REG_EXP.test(hastag));

  if (!isValid) {
    validationHashtagsErrorMessage = VALIDATION_ERROR_MESSAGE.hashtagsAreNotCorrectMessage;
  }

  return isValid;
};

const isCommentLengthCorrect = (value) => {
  const isValid = value.length <= MAX_COMMENT_LENGTH;

  if (!isValid) {
    validationCommentErrorMessage = VALIDATION_ERROR_MESSAGE.commentTooLongMessage;
  }

  return isValid;
};

const getValidationHashtagsErrorMessage = () => validationHashtagsErrorMessage;
const getValidationCommentErrorMessage = () => validationCommentErrorMessage;

export {
  isHashtagsSpaced,
  isHashtagsStartsWithHash,
  isHashtagsLengthCorrect,
  isHastagLengthCorrect,
  isHashtagsUnique,
  isHashtagsCorrect,
  isCommentLengthCorrect,
  getValidationHashtagsErrorMessage,
  getValidationCommentErrorMessage,
};
