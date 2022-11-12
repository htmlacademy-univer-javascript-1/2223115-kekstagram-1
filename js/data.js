import {getRandomArrayElement, getRandomPositiveInteger, getCommentsID, getUsersID} from './util.js';

const DESCRIPTIONS = [
  'Мяутительный выходной!',
  'Лучше, чем кошачья мята!',
  'Строим заговоры против людей...',
  '#Ненавижу_пылесосы',
  'КУСЬ'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Адам',
  'Платон',
  'Космос',
  'Фёдор',
  'Лев',
  'Добрыня'
];

const SURNAMES = [
  'Сендлер',
  'Прокопич',
  'Холмогоров',
  'Непейпиво',
  'Семёныч',
  'Никитич'
];

// eslint-disable-next-line no-unused-vars
const NUMBER_OF_PUBLICATIONS = 25;

const createPublication = () => ({
  id: getUsersID(),
  url: `photos/${  getUsersID()  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: {
    id: getCommentsID(),
    avatar: `img/avatar-${  getRandomPositiveInteger(0,6)  }.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: `${getRandomArrayElement(NAMES)  } ${  getRandomArrayElement(SURNAMES)}`,
  },
});

// eslint-disable-next-line no-unused-vars
const createPublications = () =>  Array.from({length: NUMBER_OF_PUBLICATIONS}, createPublication);

export {createPublications};
