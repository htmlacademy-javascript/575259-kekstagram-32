import { getPhotos } from './api.js';
import { renderPhotos } from './render-photos.js';
import { renderBigPhoto } from './render-big-photo.js';
import { isEnterKey, showFetchPhotosErrorAlert, debounce } from './utils.js';
import { hideFilters, setDefaultFilter, setDiscussedFilter, setRandomFilter, showFilters } from './filters.js';

const RERENDER_DELAY = 500;

const renderGallery = async () => {
  const photosContainer = document.querySelector('.pictures');

  let photos = [];

  try {
    photos = await getPhotos();
    showFilters();
    renderPhotos(photos);
    setDefaultFilter(debounce(() => renderPhotos(photos), RERENDER_DELAY));
    setRandomFilter(
      photos,
      debounce((filteredPhotos) => renderPhotos(filteredPhotos), RERENDER_DELAY),
    );
    setDiscussedFilter(
      photos,
      debounce((filteredPhotos) => renderPhotos(filteredPhotos), RERENDER_DELAY),
    );
  } catch (_error) {
    hideFilters();
    showFetchPhotosErrorAlert();
    photosContainer.removeEventListener('keydown', photosContainerKeydownHandler);
    photosContainer.removeEventListener('click', photosContainerClickHandler);
  }

  const openPhotoPreview = (event, element) => {
    event.preventDefault();

    const currentPhoto = photos.find((photo) => photo.id === Number(element.dataset.photoId));
    renderBigPhoto(currentPhoto);
  };

  function photosContainerKeydownHandler(event) {
    if (event.target.closest('.picture') && isEnterKey(event)) {
      openPhotoPreview(event, event.target.children[0]);
    }
  }

  function photosContainerClickHandler(event) {
    if (event.target.matches('.picture img')) {
      openPhotoPreview(event, event.target);
    }
  }

  photosContainer.addEventListener('keydown', photosContainerKeydownHandler);
  photosContainer.addEventListener('click', photosContainerClickHandler);
};

export { renderGallery };
