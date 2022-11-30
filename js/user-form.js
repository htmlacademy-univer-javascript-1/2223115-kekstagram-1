import {isEscapeKey} from './util.js';
import {imgUploadForm, addScaling, removeScaling} from './editor-scale.js';
import {addEffects, removeEffects} from './editor-effects.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
let hashTagsErrormessage = '';

const body = document.querySelector('body');

const uploadedFile = imgUploadForm.querySelector('#upload-file');
const imgEditor = imgUploadForm.querySelector('.img-upload__overlay');
const closeEditorButton = imgUploadForm.querySelector('#upload-cancel');
const submitEditorButton = imgUploadForm.querySelector('.img-upload__submit');
const hashTagsElement = imgUploadForm.querySelector('.text__hashtags');
const descriptionElement = imgUploadForm.querySelector('.text__description');

uploadedFile.addEventListener('input', openEditor);

hashTagsElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

descriptionElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

function onEditorCloseButtonClick () {
  closeEditor();
}

function onEditorEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditor();
  }
}

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
});

function hasDuplicates (array) {
  const valuesSoFar = [];
  for (let i = 0; i < array.length; ++i) {
    const value = array[i];
    if (valuesSoFar.indexOf(value) !== -1) {
      return true;
    }
    valuesSoFar.push(value);
  }
  return false;
}

function validateHashTags (value) {
  hashTagsErrormessage = '';
  value = value.toLowerCase();
  const arrHashTags = value.trim().split(' ');
  if (arrHashTags) {
    for (const hashTag of arrHashTags) {
      if(!re.test(hashTag)){
        if (hashTag[0] !== '#') {
          hashTagsErrormessage = 'Хэш-тег должен начинаться с символа # (решётка).';
          return false;
        }
        if (hashTag.length === 1 && hashTag[0] === '#') {
          hashTagsErrormessage = 'Хеш-тег не может состоять только из одной решётки.';
          return false;
        }
        if (hashTag.length > MAX_HASHTAG_LENGTH) {
          hashTagsErrormessage = 'Максимальная длина одного хэш-тега не должна превышать 20 символов, включая решётку.';
          return false;
        }
        hashTagsErrormessage = 'Строка после решётки должна состоять только из букв и чисел.';
        return false;
      }
      if (arrHashTags.length > MAX_HASHTAGS_COUNT) {
        hashTagsErrormessage = 'Нельзя указать больше пяти хэш-тегов.';
        return false;
      }
      if (hasDuplicates(arrHashTags)){
        hashTagsErrormessage = 'Один и тот же хэш-тег не может быть использован дважды.';
        return false;
      }
    }
    return true;
  }
}

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const generatehashTagsErrormessage = () => hashTagsErrormessage;

pristine.addValidator(hashTagsElement,validateHashTags, generatehashTagsErrormessage);
pristine.addValidator(descriptionElement,validateDescription, 'Длина комментария не может составлять больше 140 символов.');

function validateForm (evt) {
  if (pristine.validate()) {
    submitEditorButton.disabled = false;
  } else {
    evt.preventDefault();
    submitEditorButton.disabled = true;
  }
}

function closeEditor () {
  imgEditor.classList.add('hidden');
  body.classList.remove('modal-open');

  removeScaling();
  removeEffects();

  closeEditorButton.removeEventListener('click', onEditorCloseButtonClick);
  document.removeEventListener('keydown', onEditorEscKeydown);
  hashTagsElement.removeEventListener('input', validateForm);
  descriptionElement.removeEventListener('input', validateForm);
}

function openEditor () {
  imgEditor.classList.remove('hidden');
  body.classList.add('modal-open');

  addScaling();
  addEffects();

  closeEditorButton.addEventListener('click', onEditorCloseButtonClick);
  document.addEventListener('keydown', onEditorEscKeydown);
  hashTagsElement.addEventListener('input', validateForm);
  descriptionElement.addEventListener('input', validateForm);
}
