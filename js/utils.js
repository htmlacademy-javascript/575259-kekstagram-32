const ALERT_SHOW_TIME = 5000;

const KEY_CODE = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
};

const isEscapeKey = (event) => event.key === KEY_CODE.ESCAPE;
const isEnterKey = (event) => event.key === KEY_CODE.ENTER;

const showAlert = () => {
  const templateErrorContent = document.querySelector('#data-error').content;
  const errorElement = templateErrorContent.querySelector('.data-error');
  const newErrorElement = errorElement.cloneNode(true);

  const errorContainer = document.createDocumentFragment();

  errorContainer.append(newErrorElement);
  document.body.append(errorContainer);

  setTimeout(() => {
    newErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

export { isEscapeKey, isEnterKey, showAlert };
