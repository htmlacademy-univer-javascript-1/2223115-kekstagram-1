import {isEscapeKey} from './util.js';

const MAX_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const closePictureButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment');
const  commentsBlock = bigPicture.querySelector('.social__comments');
const loadingСommentsButton = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.social__comment-count');
let currentCommentCounter = 0;
let allComments = '';

function appendNewComments ({avatar, name, message}) {
  const newComment = commentTemplate.cloneNode(true).content;

  newComment.querySelector('img').src = avatar;
  newComment.querySelector('img').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
}

function onBigPictureEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onBigPictureCloseButtonClick () {
  closeBigPicture();
}


function addCommentsCount (value) {
  commentsCount.textContent = value;
}

function loadNewComments() {
  let count = MAX_COMMENTS_COUNT;
  if (allComments.length > currentCommentCounter) {
    if ((allComments.length - currentCommentCounter) <= MAX_COMMENTS_COUNT) {
      count = allComments.length - currentCommentCounter;
      loadingСommentsButton.classList.add('hidden');
    }

    const fragment = document.createDocumentFragment();
    allComments.slice(currentCommentCounter, currentCommentCounter + count).forEach((comment) => {
      fragment.appendChild(appendNewComments(comment));
    });
    commentsBlock.appendChild(fragment);
    currentCommentCounter += count;
    addCommentsCount(currentCommentCounter);
  }
}

function closeBigPicture () {
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  closePictureButton.removeEventListener('click', onBigPictureCloseButtonClick);
  loadingСommentsButton.removeEventListener('click',  loadNewComments);

  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

function openBigPicture ({url, description, likes, comments}) {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('src', url);
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  commentsBlock.innerHTML = '';
  allComments = comments;
  currentCommentCounter = 0;
  loadNewComments();

  loadingСommentsButton.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  closePictureButton.addEventListener('click',  onBigPictureCloseButtonClick);
  document.addEventListener('keydown', onBigPictureEscKeydown);
  loadingСommentsButton.addEventListener('click',  loadNewComments);
}

export {openBigPicture};
