// eslint-disable-next-line no-unused-vars
const checkStringLength = (message, maxLength) => message.length <= maxLength;

let userID = 0;
let commentID = 0;

// eslint-disable-next-line no-undef, no-unused-vars
const getUsersID = () => ++userID;

// eslint-disable-next-line no-undef, no-unused-vars
const getCommentsID = () => ++commentID;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// eslint-disable-next-line no-unused-vars
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomArrayElement, getRandomPositiveInteger, getCommentsID, getUsersID, isEscapeKey};
