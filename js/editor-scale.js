const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP = 25;
const DEFAULT_VALUE = 100;

const imgUploadForm = document.querySelector('.img-upload__form');

const scaleValue = imgUploadForm.querySelector('.scale__control--value');
const smallerScaleElement = imgUploadForm.querySelector('.scale__control--smaller');
const biggerScaleElement = imgUploadForm.querySelector('.scale__control--bigger');
const imgUploadPreviewElement = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');

scaleValue.value = `${DEFAULT_VALUE}%`;

const changeScaleValue = () => parseInt(scaleValue.value, 10);

function getImgScaleTransform() {
  imgUploadPreviewElement.style.transform = `scale(${(changeScaleValue() / 100)})`;
}

function getSmallerScalevalue() {
  let result = changeScaleValue() - SCALE_STEP;
  if (result < MIN_SCALE_VALUE) {
    result = MIN_SCALE_VALUE;
  }
  scaleValue.value = `${result}%`;
}

function getBiggerScaleValue() {
  let result = changeScaleValue() + SCALE_STEP;
  if (result > MAX_SCALE_VALUE) {
    result = MAX_SCALE_VALUE;
  }
  scaleValue.value = `${result}%`;
}

function onSmallerScaleElementClick() {
  getSmallerScalevalue();
  getImgScaleTransform();
}

function onBiggerScaleElementClick() {
  getBiggerScaleValue();
  getImgScaleTransform();
}

function addScaling () {
  getImgScaleTransform();
  smallerScaleElement.addEventListener('click', onSmallerScaleElementClick);
  biggerScaleElement.addEventListener('click', onBiggerScaleElementClick);
}

function removeScaling () {
  scaleValue.value = `${DEFAULT_VALUE}%`;
  smallerScaleElement.removeEventListener('click', onSmallerScaleElementClick);
  biggerScaleElement.removeEventListener('click', onBiggerScaleElementClick);
}

export {imgUploadForm, imgUploadPreviewElement, addScaling, removeScaling};