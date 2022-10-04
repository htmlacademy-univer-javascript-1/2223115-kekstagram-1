const DESCRIPTIONS = [
  'Мяутительный выходной!',
  'Лучше, чем кошачья мята!',
  'Строим заговоры против людей...',
  '#Ненавижу_пылесосы',
  'КУСЬ'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME = [
  'Адам',
  'Платон',
  'Космос',
  'Фёдор',
  'Лев',
  'Добрыня'
];

const SURNAME = [
  'Сендлер',
  'Прокопич',
  'Холмогоров',
  'Непейпиво',
  'Семёныч',
  'Никитич'
];

// eslint-disable-next-line no-unused-vars
const NUMBER_OF_PUBLICATIONS = 25;
let userID = 0;
let commentID = 0;

function getUsersID () {
  return ++userID;
}

function getCommentsID () {
  return ++commentID;
}

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// eslint-disable-next-line no-unused-vars
function checkStringLength (message, maxLength) {
  return message.length <= maxLength;
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

const createPublication = () => ({
  id: getUsersID,
  url: `photos/${  getUsersID }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: {
    id: getCommentsID,
    avatar: `img/avatar-${  getRandomPositiveInteger(0,6)  }.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: `${getRandomArrayElement(NAME)  }${  getRandomArrayElement(SURNAME)}`,
  },
});

// eslint-disable-next-line no-unused-vars
const publications = Array.from({length: NUMBER_OF_PUBLICATIONS}, createPublication);
