import { createPhotos } from './data.js';

const photos = createPhotos();

const renderPhotos = () => {
  const template = document.querySelector('#picture').content;
  const templatePicture = template.querySelector('.picture');
  const photosContainer = document.querySelector('.pictures');

  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const newTemplatePicture = templatePicture.cloneNode(true);
    const img = newTemplatePicture.querySelector('.picture__img');
    const likes = newTemplatePicture.querySelector('.picture__likes');
    const comments = newTemplatePicture.querySelector('.picture__comments');

    img.dataset.photoId = photo.id;
    img.src = photo.url;
    img.alt = photo.description;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;

    photosFragment.append(newTemplatePicture);
  });

  photosContainer.append(photosFragment);
};

export { renderPhotos, photos };
