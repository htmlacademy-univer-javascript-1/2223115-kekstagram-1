import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closePictureButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comments');

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

function appendNewComments ({avatar, name, message}) {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
}

function buttonKeydownHandler () {
  if (isEscapeKey) {
    closeBigPicture();
  }
}

function closeBigPicture () {
  document.removeEventListener('keydown', buttonKeydownHandler);
  closePictureButton.removeEventListener('click', closeBigPicture);

  bigPicture.classList.add('hidden');

  document.querySelector('body').classList.remove('modal-open');
}

function openBigPicture ({url, description, likes, comments}) {
  bigPicture.querySelector('.big-picture__img').querySelector('.img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  bigPicture.querySelector('.social__comments').innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.appendChild(appendNewComments(comment));
  });

  bigPicture.querySelector('.social__comments').appendChild(fragment);
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  closePictureButton.addEventListener('click',  closeBigPicture);
}

export {openBigPicture};
