import {isEscapeKey} from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
let hashTagsErorrmessage = '';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadedFile = imgUploadForm.querySelector('#upload-file');
const imgEditor = imgUploadForm.querySelector('.img-upload__overlay');
const closeEditorButton = imgUploadForm.querySelector('#upload-cancel');
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
  hashTagsErorrmessage = '';
  value = value.toLowerCase();
  const arrHashTags = value.split(' ');
  if (arrHashTags) {
    for (const hashTag of arrHashTags) {
      if(!re.test(hashTag)){
        if (hashTag[0] !== '#') {
          hashTagsErorrmessage = 'Хэш-тег должен начинаться с символа # (решётка).';
          return false;
        }
        if (hashTag.length === 1 && hashTag[0] === '#') {
          hashTagsErorrmessage = 'Хеш-тег не может состоять только из одной решётки.';
          return false;
        }
        if (hashTag.length > MAX_HASHTAG_LENGTH) {
          hashTagsErorrmessage = 'Максимальная длина одного хэш-тега не должна превышать 20 символов, включая решётку.';
          return false;
        }
        hashTagsErorrmessage = 'Строка после решётки должна состоять только из букв и чисел.';
        return false;
      }
      if (arrHashTags.length > MAX_HASHTAGS_COUNT) {
        hashTagsErorrmessage = 'Нельзя указать больше пяти хэш-тегов.';
        return false;
      }
      if (hasDuplicates(arrHashTags)){
        hashTagsErorrmessage = 'Один и тот же хэш-тег не может быть использован дважды.';
        return false;
      }
    }
    return true;
  }
}

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(hashTagsElement,validateHashTags, hashTagsErorrmessage);
pristine.addValidator(descriptionElement,validateDescription, 'Длина комментария не может составлять больше 140 символов.');

function validateForm () {
  pristine.validate();
  if (pristine.validate()) {
    SubmitEditorButton.disabled = false;
  } else {
    SubmitEditorButton.disabled = true;
  }
}


function closeEditor () {
  imgEditor.classList.add('hidden');
  body.classList.remove('modal-open');

  closeEditorButton.removeEventListener('click', onEditorCloseButtonClick);
  document.removeEventListener('keydown', onEditorEscKeydown);
  hashTagsElement.removeEventListener('input', validateForm);
  descriptionElement.removeEventListener('input', validateForm);
}

function openEditor () {
  imgEditor.classList.remove('hidden');
  body.classList.add('modal-open');

  closeEditorButton.addEventListener('click', onEditorCloseButtonClick);
  document.addEventListener('keydown', onEditorEscKeydown);
  hashTagsElement.addEventListener('input', validateForm);
  descriptionElement.addEventListener('input', validateForm);
}
