import {
  createRandomIdFromRangeGenerator,
  getRandomInteger,
  getRandomArrayElement,
} from './utils.js';

const PHOTOS = 25;
const MIN_COMMENT_ID = 1;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_MESSAGE_PARAGRAPHS = 1;
const MAX_MESSAGE_PARAGRAPHS = 2;
const NAMES = [
  'Александр',
  'Михаил',
  'Дмитрий',
  'Максим',
  'Сергей',
  'Андрей',
  'Алексей',
  'Артем',
  'Илья',
  'Кирилл',
  'Никита',
  'Матвей',
  'Роман',
  'Егор',
  'Арсений',
  'Иван',
  'Денис',
  'Евгений',
  'Даниил',
  'Тимофей',
  'Владислав',
  'Игорь',
  'Владимир',
  'Павел',
  'Руслан',
  'Марк',
  'Константин',
  'Тимур',
  'Олег',
  'Ярослав',
  'Виктор',
  'Лев',
  'Анатолий',
  'Степан',
  'Николай',
  'Глеб',
  'Федор',
  'Юрий',
  'Борис',
  'Станислав',
  'Василий',
  'Валерий',
  'Антон',
  'Вячеслав',
  'Григорий',
  'Леонид',
  'Семен',
  'Петр',
  'Марат',
  'Вадим',
  'Мария',
  'Анна',
  'Алина',
  'Ирина',
  'Екатерина',
  'Наталья',
  'Вероника',
  'Ольга',
  'Татьяна',
  'Юлия',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generateCommentId = createRandomIdFromRangeGenerator(
  MIN_COMMENT_ID,
  PHOTOS * MAX_COMMENTS
);

const createComment = () => {
  const id = generateCommentId();
  const avatar = `img/avatar-${getRandomInteger(
    MIN_AVATAR_ID,
    MAX_AVATAR_ID
  )}.svg`;
  const messagesCount = getRandomInteger(
    MIN_MESSAGE_PARAGRAPHS,
    MAX_MESSAGE_PARAGRAPHS
  );
  const messages = Array.from({ length: messagesCount }, () =>
    getRandomArrayElement(COMMENTS)
  );

  const message = messages.join(' ');
  const name = getRandomArrayElement(NAMES);

  return {
    id,
    avatar,
    message,
    name,
  };
};

const createPhoto = (_element, index) => {
  const id = index + 1;
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = Array.from({ length: commentsCount }, createComment);
  const likes = getRandomInteger(MIN_LIKES, MAX_LIKES);
  const description = 'Описание фотографии';
  const url = `photos/${id}.jpg`;

  return {
    id,
    url,
    description,
    likes,
    comments,
  };
};

const createPhotos = () => Array.from({ length: PHOTOS }, createPhoto);

export { createPhotos };
