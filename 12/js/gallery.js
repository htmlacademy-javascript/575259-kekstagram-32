import { getPhotos } from './api.js';
import { renderPhotos } from './render-photos.js';
import { renderBigPhoto } from './render-big-photo.js';
import { isEnterKey, showFetchPhotosErrorAlert } from './utils.js';

let photos = [];

try {
  photos = await getPhotos();
  renderPhotos(photos);
} catch (_error) {
  showFetchPhotosErrorAlert();
}

const photosContainer = document.querySelector('.pictures');

const openPhotoPreview = (event, element) => {
  event.preventDefault();

  const currentPhoto = photos.find((photo) => photo.id === Number(element.dataset.photoId));
  renderBigPhoto(currentPhoto);
};

const photoPreviewKeyDownHandler = (event) => {
  if (event.target.closest('.picture') && isEnterKey(event)) {
    openPhotoPreview(event, event.target.children[0]);
  }
};

const photoPreviewClickHandler = (event) => {
  if (event.target.matches('.picture img')) {
    openPhotoPreview(event, event.target);
  }
};

photosContainer.addEventListener('keydown', photoPreviewKeyDownHandler);

photosContainer.addEventListener('click', photoPreviewClickHandler);
