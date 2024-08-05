const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const scaleSmallerButtonClickHandler = () => {
  const currentScale = parseInt(scaleInput.value, 10);
  const newScale = currentScale - SCALE_STEP;

  if (newScale < SCALE_MIN) {
    return;
  }
  scaleInput.value = `${newScale}%`;
  imgPreview.style.transform = `scale(${newScale / 100})`;
};

const scaleBiggerButtonClickHandler = () => {
  const currentScale = parseInt(scaleInput.value, 10);
  const newScale = currentScale + SCALE_STEP;

  if (newScale > SCALE_MAX) {
    return;
  }

  scaleInput.value = `${newScale}%`;
  imgPreview.style.transform = `scale(${newScale / 100})`;
};

const resetScale = () => {
  imgPreview.style.transform = 'scale(1)';
  scaleInput.value = '100%';

  scaleSmallerButton.removeEventListener('click', scaleSmallerButtonClickHandler);
  scaleBiggerButton.removeEventListener('click', scaleBiggerButtonClickHandler);
};

const setScale = () => {
  scaleSmallerButton.addEventListener('click', scaleSmallerButtonClickHandler);
  scaleBiggerButton.addEventListener('click', scaleBiggerButtonClickHandler);
};

export { resetScale, setScale };
