import { isEscapeKey } from './utils.js';

const HASH_TAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASH_TAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

imgUploadForm.addEventListener('submit', () => {
  pristine.validate();
});

const hashTagInput = imgUploadForm.querySelector('.text__hashtags');

const validateHashtag = (value) => {
  const hastags = value.split(' ').map((hastag) => hastag.toLowerCase());

  const isEveryHashTagStartsWithHash = hastags.every((hastag) => hastag.startsWith('#'));

  if (!isEveryHashTagStartsWithHash) {
    return false;
  }

  if (hastags.length > MAX_HASH_TAG_COUNT) {
    return false;
  }

  const uniqueHashtagsLength = new Set(hastags).size;

  if (hastags.length !== uniqueHashtagsLength) {
    return false;
  }

  const isEveryHashTagCorrect = hastags.every((hastag) => HASH_TAG_REG_EXP.test(hastag));

  if (!isEveryHashTagCorrect) {
    return false;
  }

  return true;
};

pristine.addValidator(hashTagInput, validateHashtag, 'Хэштег некорректный');

hashTagInput.addEventListener('keydown', (event) => {
  if (event.target.focus) {
    event.stopPropagation();
  }
});

const commentInput = imgUploadForm.querySelector('.text__description');

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(commentInput, validateComment, 'Длина комментария не должна превышать 140 символов');

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
