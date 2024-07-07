import { renderBigPhoto } from './render-big-photo.js';
import { renderPhotos, photos } from './render-photos.js';
import { isEnterKey } from './utils.js';

renderPhotos();

const photosContainer = document.querySelector('.pictures');

const bigPhotoOpen = (event, element) => {
  event.preventDefault();

  const currentPhoto = photos.find((photo) => photo.id === Number(element.dataset.photoId));
  renderBigPhoto(currentPhoto);
};

const handleBigPhotoOpenKeyDown = (event) => {
  if (event.target.closest('.picture') && isEnterKey(event)) {
    bigPhotoOpen(event, event.target.children[0]);
  }
};

const handleBigPhotoOpenClick = (event) => {
  if (event.target.matches('.picture img')) {
    bigPhotoOpen(event, event.target);
  }
};

photosContainer.addEventListener('keydown', handleBigPhotoOpenKeyDown);

photosContainer.addEventListener('click', handleBigPhotoOpenClick);
