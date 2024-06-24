const PHOTOS_COUNT = 25;
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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= max - min + 1) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => {
  const messagesCount = getRandomInteger(1, 2);
  const messages = Array.from({ length: messagesCount }, () =>
    getRandomArrayElement(COMMENTS)
  );

  const message = messages.join(' ');
  const name = getRandomArrayElement(NAMES);

  return {
    id: getRandomInteger(1, 1000),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message,
    name,
  };
};

const generatePhotoId = createRandomIdFromRangeGenerator(1, PHOTOS_COUNT);

const createPhoto = () => {
  const photoId = generatePhotoId();
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({ length: commentsCount }, createComment);
  const likes = getRandomInteger(15, 200);

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: 'Описание фотографии',
    likes,
    comments,
  };
};

const photos = Array.from({ length: PHOTOS_COUNT }, createPhoto);

// eslint-disable-next-line no-console
console.log(photos);
