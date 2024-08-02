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
import { resetScale } from './big-photo-scale.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const hashTagInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const addKeyDownUploadOverlayEvent = () => {
  document.addEventListener('keydown', imageUploadOverlayKeydownHandler);
};

const removeKeyDownUploadOverlayEvent = () => {
  document.removeEventListener('keydown', imageUploadOverlayKeydownHandler);
};

const imgUploadOverlayClose = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  hashTagInput.value = '';
  commentInput.value = '';
  resetFilters();
  resetScale();
  pristine.reset();

  imgUploadCancelButton.removeEventListener('click', imgUploadOverlayCloseHandler);
  removeKeyDownUploadOverlayEvent();
  hashTagInput.removeEventListener('keydown', inputKeydownHandler);
  commentInput.removeEventListener('keydown', inputKeydownHandler);
  imgUploadForm.removeEventListener('submit', imgUploadFormSubmitHandler);
};

const imgUploadOverlayOpen = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  imgUploadForm.addEventListener('submit', imgUploadFormSubmitHandler);

  imgUploadCancelButton.addEventListener('click', imgUploadOverlayCloseHandler);
  addKeyDownUploadOverlayEvent();
};

const setImgPreview = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  const previewUrl = URL.createObjectURL(file);

  effectsPreview.forEach((effect) => {
    effect.style.backgroundImage = `url(${previewUrl})`;
  });

  if (matches) {
    imgPreview.src = previewUrl;
  }
};

const imgUploadOverlayOpenHandler = () => {
  imgUploadOverlayOpen();
  setImgPreview();
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
      showCreatePhotoErrorAlert(addKeyDownUploadOverlayEvent, removeKeyDownUploadOverlayEvent);
    } finally {
      submitButton.disabled = false;
    }
  }
}

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
