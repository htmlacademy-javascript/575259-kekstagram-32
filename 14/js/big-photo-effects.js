const DEFAULT_EFFECT_VALUE = 100;

const EFFECTS = {
  chrome: 'effect-chrome',
  sepia: 'effect-sepia',
  marvin: 'effect-marvin',
  phobos: 'effect-phobos',
  heat: 'effect-heat',
  none: 'effect-none',
};

const DEFAULT_SLIDER_OPTIONS = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

const MARVIN_FILTER_SLIDER_OPTIONS = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
};

const PHOBOS_FILTER_SLIDER_OPTIONS = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const HEAT_FILTER_SLIDER_OPTIONS = {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const FILTER_SLIDER_OPTIONS_MAPPING = {
  [EFFECTS.chrome]: DEFAULT_SLIDER_OPTIONS,
  [EFFECTS.sepia]: DEFAULT_SLIDER_OPTIONS,
  [EFFECTS.marvin]: MARVIN_FILTER_SLIDER_OPTIONS,
  [EFFECTS.phobos]: PHOBOS_FILTER_SLIDER_OPTIONS,
  [EFFECTS.heat]: HEAT_FILTER_SLIDER_OPTIONS,
  [EFFECTS.none]: DEFAULT_SLIDER_OPTIONS,
};

const FILTER_MAPPING = {
  [EFFECTS.chrome]: (value) => `grayscale(${value})`,
  [EFFECTS.sepia]: (value) => `sepia(${value})`,
  [EFFECTS.marvin]: (value) => `invert(${value}%)`,
  [EFFECTS.phobos]: (value) => `blur(${value}px)`,
  [EFFECTS.heat]: (value) => `brightness(${value})`,
  [EFFECTS.none]: () => 'none',
};

const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const imgPreview = document.querySelector('.img-upload__preview img');

effectLevelValue.value = DEFAULT_EFFECT_VALUE;

noUiSlider.create(effectLevelSlider, {
  ...DEFAULT_SLIDER_OPTIONS,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectLevelSlider.noUiSlider.on('update', () => {
  const value = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = value;

  const effectId = document.querySelector('.effects__radio:checked').id;

  imgPreview.style.filter = FILTER_MAPPING[effectId](value);
});

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
  effectLevelSlider.classList.remove('hidden');
};

const resetFilters = () => {
  const defaultEffect = document.querySelector('.effects__radio#effect-none');
  defaultEffect.checked = true;

  sliderContainer.classList.add('hidden');
  effectLevelSlider.classList.add('hidden');
  imgPreview.style.filter = 'none';
  effectLevelSlider.noUiSlider.updateOptions(FILTER_SLIDER_OPTIONS_MAPPING[EFFECTS.none]);
};

resetFilters();

effectsList.addEventListener('change', (event) => {
  if (event.target.closest('.effects__radio')) {
    const effectId = event.target.id;

    const value = effectLevelValue.value;

    if (effectId === EFFECTS.none) {
      resetFilters();
      return;
    }

    showSlider();
    imgPreview.style.filter = FILTER_MAPPING[effectId](value);
    effectLevelSlider.noUiSlider.updateOptions(FILTER_SLIDER_OPTIONS_MAPPING[effectId]);
  }
});

export { resetFilters };
