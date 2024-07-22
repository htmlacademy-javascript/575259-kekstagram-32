import { isEscapeKey } from './utils.js';
import {
  isHashtagsSpaced,
  isHastagLengthCorrect,
  isHashtagsStartsWithHash,
  isHashtagsLengthCorrect,
  isHashtagsUnique,
  isHashtagsCorrect,
  isCommentLengthCorrect,
  getValidationHashtagsErrorMessage,
  getValidationCommentErrorMessage,
  validateByRules,
} from './validation-utils.js';

const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

imgUploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    imgUploadForm.submit();
  }
});

const hashTagInput = imgUploadForm.querySelector('.text__hashtags');

const validateHashtag = (value) => {
  const hashtags = value.split(' ').map((hastag) => hastag.toLowerCase());

  const validationRules = [
    isHashtagsSpaced,
    isHashtagsStartsWithHash,
    isHastagLengthCorrect,
    isHashtagsLengthCorrect,
    isHashtagsUnique,
    isHashtagsCorrect,
  ];

  return validateByRules(
    validationRules,
    hashtags
  );
};

pristine.addValidator(hashTagInput, validateHashtag, getValidationHashtagsErrorMessage);

hashTagInput.addEventListener('keydown', (event) => {
  if (event.target.focus) {
    event.stopPropagation();
  }
});

const commentInput = imgUploadForm.querySelector('.text__description');

const validateComment = (value) => isCommentLengthCorrect(value);

pristine.addValidator(commentInput, validateComment, getValidationCommentErrorMessage);

commentInput.addEventListener('keydown', (event) => {
  if (event.target.focus) {
    event.stopPropagation();
  }
});

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');

const imgUploadOverlayClose = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  hashTagInput.value = '';
  commentInput.value = '';

  imgUploadCancelButton.removeEventListener('click', imgUploadOverlayCloseHandler);
  document.removeEventListener('keydown', imageUploadOverlayKeydownHandler);
};

const imgUploadOverlayOpen = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  imgUploadCancelButton.addEventListener('click', imgUploadOverlayCloseHandler);
  document.addEventListener('keydown', imageUploadOverlayKeydownHandler);
};

const imgUploadOverlayOpenHandler = () => {
  imgUploadOverlayOpen();
};

imgUploadInput.addEventListener('change', imgUploadOverlayOpenHandler);

function imgUploadOverlayCloseHandler() {
  imgUploadOverlayClose();
}

function imageUploadOverlayKeydownHandler(event) {
  if (isEscapeKey(event)) {
    event.preventDefault();

    imgUploadOverlayClose();
  }
}
