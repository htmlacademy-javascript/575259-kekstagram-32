import { renderBigPhoto } from './render-big-photo.js';
import { renderPhotos, photos } from './render-photos.js';

renderPhotos();

const photosContainer = document.querySelector('.pictures');

photosContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('picture__img')) {
    event.preventDefault();

    const currentPhoto = photos.find((photo) => photo.id === Number(event.target.id));
    renderBigPhoto(currentPhoto);
  }
});
