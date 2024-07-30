const ALERT_SHOW_TIME = 5000;

const KEY_CODE = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
};

const isEscapeKey = (event) => event.key === KEY_CODE.ESCAPE;
const isEnterKey = (event) => event.key === KEY_CODE.ENTER;

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

const showCreatePhotoErrorAlert = () => {
  const errorElement = createTemplateElementByID('error');
  const errorContainer = document.createDocumentFragment();
  const errorButton = errorElement.querySelector('.error__button');
  const errorInnerElement = errorElement.querySelector('.error__inner');

  errorContainer.append(errorElement);
  document.body.append(errorContainer);

  const closeSuccessAlert = () => {
    errorElement.remove();
    errorElement.removeEventListener('keydown', escapeKeyHandler);
    errorElement.removeEventListener('click', outsideClickHandler);
    errorButton.removeEventListener('click', errorButtonClickHandler);
  };

  function outsideClickHandler(event) {
    if (!errorInnerElement.contains(event.target)) {
      closeSuccessAlert();
    }
  }

  function escapeKeyHandler(event) {
    if (isEscapeKey(event)) {
      event.preventDefault();
      closeSuccessAlert();
    }
  }

  function errorButtonClickHandler() {
    closeSuccessAlert();
  }

  errorElement.addEventListener('click', outsideClickHandler);
  errorElement.addEventListener('keydown', escapeKeyHandler);
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
    successElement.removeEventListener('keydown', escapeKeyHandler);
    successElement.removeEventListener('click', outsideClickHandler);
  };

  function escapeKeyHandler(event) {
    if (isEscapeKey(event)) {
      event.preventDefault();
      closeSuccessAlert();
    }
  }

  function outsideClickHandler(event) {
    if (!successInnerElement.contains(event.target)) {
      closeSuccessAlert();
    }
  }

  const successButtonClickHandler = () => {
    closeSuccessAlert();
  };

  successElement.addEventListener('keydown', escapeKeyHandler);
  successElement.addEventListener('click', outsideClickHandler);

  const successButton = successElement.querySelector('.success__button');
  successButton.addEventListener('click', successButtonClickHandler);
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
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
