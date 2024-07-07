import { isEscapeKey } from './utils';

const bigPhoto = document.querySelector('.big-picture');
const bigPhotoCloseButton = bigPhoto.querySelector('.big-picture__cancel');
const bigPhotoImg = bigPhoto.querySelector('.big-picture__img img');
const bigPhotolikes = bigPhoto.querySelector('.likes-count');
const bigPhotoTotalcomments = bigPhoto.querySelector('.social__comment-total-count');
const showedComments = bigPhoto.querySelector('.social__comment-shown-count');
const bigPhotoDescription = bigPhoto.querySelector('.social__caption');
const commentsLoader = bigPhoto.querySelector('.comments-loader');
const commentsCount = bigPhoto.querySelector('.social__comment-count');
const commentsContainer = bigPhoto.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    bigPhotoClose();
  }
};

const handleBigPhotoClose = () => {
  bigPhotoClose();
};

const handleBigPhotoCloseByEsc = (event) => {
  onDocumentKeydown(event);
};

const bigPhotoOpen = () => {
  bigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', handleBigPhotoCloseByEsc);
  bigPhotoCloseButton.addEventListener('click', handleBigPhotoClose);
};

function bigPhotoClose() {
  bigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleBigPhotoCloseByEsc);
  bigPhotoCloseButton.addEventListener('click', handleBigPhotoClose);
}

const generateCommentsBlock = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const { avatar, name, message } = comment;

    const COMMENT_IMAGE_WIDTH = 35;
    const COMMENT_IMAGE_HEIGHT = 35;

    const li = document.createElement('li');
    li.classList.add('social__comment');

    const commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.src = avatar;
    commentImg.alt = name;
    commentImg.width = COMMENT_IMAGE_WIDTH;
    commentImg.height = COMMENT_IMAGE_HEIGHT;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;
    li.append(commentImg, commentText);

    commentsFragment.append(li);
  });

  return commentsFragment;
};

const renderBigPhoto = (photo) => {
  const { comments, url, likes, description } = photo;

  bigPhotoOpen();

  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');

  bigPhotoImg.src = url;
  bigPhotolikes.textContent = likes;
  bigPhotoTotalcomments.textContent = comments.length;
  showedComments.textContent = comments.length;
  bigPhotoDescription.textContent = description;

  const commentsFragment = generateCommentsBlock(comments);

  commentsContainer.textContent = '';
  commentsContainer.append(commentsFragment);
};

export { renderBigPhoto };
