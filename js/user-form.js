import {isEscapeKey, showAlert} from './util.js';
import { getFormValidator } from './validate-form.js';
import {addScaling, removeScaling} from './editor-scale.js';
import {addEffect, removeEffect} from './editor-effects.js';
import {sendDataToServer} from './api.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const body = document.querySelector('body');

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadedFile = imgUploadForm.querySelector('#upload-file');
const imgEditor = imgUploadForm.querySelector('.img-upload__overlay');
const closeEditorButton = imgUploadForm.querySelector('#upload-cancel');
const submitEditorButton = imgUploadForm.querySelector('.img-upload__submit');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview').querySelector('img');


const hashTagsElement = imgUploadForm.querySelector('.text__hashtags');
const descriptionElement = imgUploadForm.querySelector('.text__description');
const validator = getFormValidator(imgUploadForm, hashTagsElement, descriptionElement);

const successFormTemplate = document.querySelector('#success').content.querySelector('.success');
const successButton = successFormTemplate.querySelector('.success__button');

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

function validateForm (evt) {
  if (validator.validate()) {
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
  removeEffect();

  closeEditorButton.removeEventListener('click', onEditorCloseButtonClick);
  document.removeEventListener('keydown', onEditorEscKeydown);
  hashTagsElement.removeEventListener('input', validateForm);
  descriptionElement.removeEventListener('input', validateForm);
}

function openEditor () {
  const img = uploadedFile.files[0];
  const imgName = img.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => imgName.endsWith(it));

  if (matches) {
    imgUploadPreviewElement.src = URL.createObjectURL(img);
  }

  imgEditor.classList.remove('hidden');
  body.classList.add('modal-open');

  addScaling();
  addEffect();

  closeEditorButton.addEventListener('click', onEditorCloseButtonClick);
  document.addEventListener('keydown', onEditorEscKeydown);
  hashTagsElement.addEventListener('input', validateForm);
  descriptionElement.addEventListener('input', validateForm);
}

const unblockSubmitButton = () => {
  submitEditorButton.disabled = false;
  submitEditorButton.textContent = 'Опубликовать';
};

const blockSubmitButton = () => {
  submitEditorButton.disabled = true;
  submitEditorButton.textContent = 'Публикую...';
};

const hideSuccessForm = () => {
  body.removeChild(successFormTemplate);
  successButton.removeEventListener('click', hideSuccessForm);
};

const showSuccessForm = () => {
  body.appendChild(successFormTemplate);
  successButton.addEventListener('click', hideSuccessForm);
};

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validator.validate();
    if (isValid) {
      blockSubmitButton();
      sendDataToServer(
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccessForm();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, closeEditor};
