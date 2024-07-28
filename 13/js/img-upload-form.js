import { isEscapeKey, showCreatePhotoErrorAlert, showCreatePhotoSuccessAlert } from './utils.js';
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
import { createPhoto } from './api.js';
import { resetFilters } from './big-photo-effects.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const hashTagInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');

const imgUploadOverlayClose = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  hashTagInput.value = '';
  commentInput.value = '';
  resetFilters();

  imgUploadCancelButton.removeEventListener('click', imgUploadOverlayCloseHandler);
  document.removeEventListener('keydown', imageUploadOverlayKeydownHandler);
  hashTagInput.removeEventListener('keydown', inputKeydownHandler);
  commentInput.removeEventListener('keydown', inputKeydownHandler);
  imgUploadForm.removeEventListener('submit', imgUploadFormSubmitHandler);
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

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

async function imgUploadFormSubmitHandler(event) {
  event.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButton.disabled = true;
    const formData = new FormData(event.target);

    try {
      await createPhoto(formData);
      imgUploadOverlayClose();
      showCreatePhotoSuccessAlert();
    } catch (_error) {
      showCreatePhotoErrorAlert();
    } finally {
      submitButton.disabled = false;
    }
  }
}

imgUploadForm.addEventListener('submit', imgUploadFormSubmitHandler);

const validateHashtag = (value) => {
  const hashtags = value
    .split(' ')
    .map((hastag) => hastag.toLowerCase())
    .filter(Boolean);

  if (hashtags.length === 0) {
    return true;
  }

  const validationRules = [
    isHashtagsSpaced,
    isHashtagsStartsWithHash,
    isHastagLengthCorrect,
    isHashtagsLengthCorrect,
    isHashtagsUnique,
    isHashtagsCorrect,
  ];

  return validateByRules(validationRules, hashtags);
};

pristine.addValidator(hashTagInput, validateHashtag, getValidationHashtagsErrorMessage);

function inputKeydownHandler(event) {
  if (event.target.focus) {
    event.stopPropagation();
  }
}

hashTagInput.addEventListener('keydown', inputKeydownHandler);

const validateComment = (value) => isCommentLengthCorrect(value);

pristine.addValidator(commentInput, validateComment, getValidationCommentErrorMessage);

commentInput.addEventListener('keydown', inputKeydownHandler);
