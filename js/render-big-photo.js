import { isEscapeKey } from './utils';

const COMMENT_IMAGE_WIDTH = 35;
const COMMENT_IMAGE_HEIGHT = 35;
const COMMENTS_COUNT_STEP = 5;

const bigPhoto = document.querySelector('.big-picture');
const bigPhotoCloseButton = bigPhoto.querySelector('.big-picture__cancel');
const bigPhotoImg = bigPhoto.querySelector('.big-picture__img img');
const bigPhotolikes = bigPhoto.querySelector('.likes-count');
const bigPhotoTotalcomments = bigPhoto.querySelector('.social__comment-total-count');
const showedComments = bigPhoto.querySelector('.social__comment-shown-count');
const bigPhotoDescription = bigPhoto.querySelector('.social__caption');
const commentsContainer = bigPhoto.querySelector('.social__comments');
const commentsLoadMore = bigPhoto.querySelector('.comments-loader');

let currentComments = [];
let currentCommentsCount = COMMENTS_COUNT_STEP;

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

  if (currentComments.length > COMMENTS_COUNT_STEP) {
    commentsLoadMore.classList.remove('hidden');
  }

  document.addEventListener('keydown', handleBigPhotoCloseByEsc);
  bigPhotoCloseButton.addEventListener('click', handleBigPhotoClose);
};

function bigPhotoClose() {
  currentComments = [];
  currentCommentsCount = COMMENTS_COUNT_STEP;

  bigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleBigPhotoCloseByEsc);
  bigPhotoCloseButton.removeEventListener('click', handleBigPhotoClose);
  commentsLoadMore.removeEventListener('click', handleCommentsLoadMore);
}

const renderCommentsBlock = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const { avatar, name, message } = comment;

    const listItemElement = document.createElement('li');
    listItemElement.classList.add('social__comment');

    const commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.src = avatar;
    commentImg.alt = name;
    commentImg.width = COMMENT_IMAGE_WIDTH;
    commentImg.height = COMMENT_IMAGE_HEIGHT;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;
    listItemElement.append(commentImg, commentText);
    commentsFragment.append(listItemElement);
  });

  commentsContainer.textContent = '';
  commentsContainer.append(commentsFragment);
};

function handleCommentsLoadMore() {
  currentCommentsCount += COMMENTS_COUNT_STEP;
  showedComments.textContent = currentCommentsCount;
  renderCommentsBlock(currentComments.slice(0, currentCommentsCount));

  if (currentCommentsCount >= currentComments.length) {
    commentsLoadMore.classList.add('hidden');
    showedComments.textContent = Math.min(currentCommentsCount, currentComments.length);
  }
}

const renderBigPhoto = (photo) => {
  const { comments, url, likes, description } = photo;
  currentComments = comments;

  bigPhotoOpen();

  bigPhotoImg.src = url;
  bigPhotolikes.textContent = likes;
  bigPhotoTotalcomments.textContent = comments.length;
  showedComments.textContent = Math.min(currentCommentsCount, comments.length);
  bigPhotoDescription.textContent = description;

  renderCommentsBlock(currentComments.slice(0, currentCommentsCount));

  if (currentCommentsCount >= currentComments.length) {
    commentsLoadMore.classList.add('hidden');
  }

  commentsLoadMore.addEventListener('click', handleCommentsLoadMore);
};

export { renderBigPhoto };
