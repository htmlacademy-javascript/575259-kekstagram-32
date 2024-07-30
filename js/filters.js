import { createRandomIndexFromRangeGenerator } from './utils.js';

const MAX_RANDOM_PHOTOS = 10;

const filters = document.querySelector('.img-filters');
filters.classList.remove('img-filters--inactive');

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

const setDefaultFilter = (callback) => {
  const filterClickHandler = () => {
    filterDiscussed.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDefault.classList.add('img-filters__button--active');

    callback();
  };

  filterDefault.addEventListener('click', filterClickHandler);
};

const setRandomFilter = (photos, callback) => {
  const clickFilterHandler = () => {
    filterDiscussed.classList.remove('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');

    const randomIndexGenerator = createRandomIndexFromRangeGenerator(0, photos.length - 1);

    const filteredPhotos = [];

    for (let i = 0; i < MAX_RANDOM_PHOTOS; i += 1) {
      filteredPhotos.push(photos[randomIndexGenerator()]);
    }

    callback(filteredPhotos);
  };

  filterRandom.addEventListener('click', clickFilterHandler);
};

const setDiscussedFilter = (photos, callback) => {
  const clickFilterHandler = () => {
    const filteredPhotos = [...photos].sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);

    filterRandom.classList.remove('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');

    callback(filteredPhotos);
  };

  filterDiscussed.addEventListener('click', clickFilterHandler);
};

const hideFilters = () => filters.classList.add('img-filters--inactive');

export { setDiscussedFilter, setDefaultFilter, setRandomFilter, hideFilters };
