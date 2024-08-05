const ALERT_SHOW_TIME = 5000;

const KeyCode = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
};

const isEscapeKey = (event) => event.key === KeyCode.ESCAPE;
const isEnterKey = (event) => event.key === KeyCode.ENTER;

const createTemplateElementByID = (id) => {
  const templateContent = document.querySelector(`#${id}`).content;
  const element = templateContent.querySelector(`.${id}`);
  return element.cloneNode(true);
};

const showFetchPhotosErrorAlert = () => {
  const errorElement = createTemplateElementByID('data-error');

  const errorContainer = document.createDocumentFragment();

  errorContainer.append(errorElement);
  document.body.append(errorContainer);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const showCreatePhotoErrorAlert = (addKeyDownUploadOverlayEvent, removeKeyDownUploadOverlayEvent) => {
  const errorElement = createTemplateElementByID('error');
  const errorContainer = document.createDocumentFragment();
  const errorButton = errorElement.querySelector('.error__button');
  const errorInnerElement = errorElement.querySelector('.error__inner');

  removeKeyDownUploadOverlayEvent();

  errorContainer.append(errorElement);
  document.body.append(errorContainer);

  const closeSuccessAlert = () => {
    errorElement.remove();
    document.removeEventListener('keydown', documentKeydownHandler);
    errorElement.removeEventListener('click', errorElementClickHandler);
    errorButton.removeEventListener('click', errorButtonClickHandler);
    addKeyDownUploadOverlayEvent();
  };

  function errorElementClickHandler(event) {
    if (!errorInnerElement.contains(event.target)) {
      closeSuccessAlert();
    }
  }

  function documentKeydownHandler(event) {
    if (isEscapeKey(event)) {
      event.preventDefault();
      closeSuccessAlert();
    }
  }

  function errorButtonClickHandler() {
    closeSuccessAlert();
  }

  errorElement.addEventListener('click', errorElementClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  errorButton.addEventListener('click', errorButtonClickHandler);
};

const showCreatePhotoSuccessAlert = () => {
  const successElement = createTemplateElementByID('success');
  const successInnerElement = successElement.querySelector('.success__inner');

  const successContainer = document.createDocumentFragment();

  successContainer.append(successElement);
  document.body.append(successContainer);

  const closeSuccessAlert = () => {
    successElement.remove();
    document.removeEventListener('keydown', documentKeydownHandler);
    successElement.removeEventListener('click', successElementClickHandler);
  };

  function documentKeydownHandler(event) {
    if (isEscapeKey(event)) {
      event.preventDefault();
      closeSuccessAlert();
    }
  }

  function successElementClickHandler(event) {
    if (!successInnerElement.contains(event.target)) {
      closeSuccessAlert();
    }
  }

  const successButtonClickHandler = () => {
    closeSuccessAlert();
  };

  document.addEventListener('keydown', documentKeydownHandler);
  successElement.addEventListener('click', successElementClickHandler);

  const successButton = successElement.querySelector('.success__button');
  successButton.addEventListener('click', successButtonClickHandler);
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIndexFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  isEnterKey,
  showFetchPhotosErrorAlert,
  showCreatePhotoErrorAlert,
  showCreatePhotoSuccessAlert,
  createRandomIndexFromRangeGenerator,
  debounce,
};
