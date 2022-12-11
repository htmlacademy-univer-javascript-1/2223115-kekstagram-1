import {imgUploadForm, imgUploadPreviewElement} from './editor-scale.js';

const EFFECTS = {
  CHROME: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },

  SEPIA: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },

  MARVIN: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return `${value}%`;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },

  PHOBOS: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return `${value.toFixed(1)}px`;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },

  HEAT: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function(value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  }
};

const effectRadioButton = imgUploadForm.querySelector('.effects__list');
const depthEffectValue = imgUploadForm.querySelector('.effect-level__value');
const depthEffectRange= imgUploadForm.querySelector('.img-upload__effect-level');
const sliderElement = imgUploadForm.querySelector('.effect-level__slider');

function uploadStyle (styleCommand) {
  sliderElement.noUiSlider.on('update', () => {
    depthEffectValue.value = parseFloat(sliderElement.noUiSlider.get());
    imgUploadPreviewElement.style.filter = `${styleCommand}(${sliderElement.noUiSlider.get()})`;
  });
}

function removeLastEffect () {
  imgUploadPreviewElement.className = '';
  imgUploadPreviewElement.style.filter = '';

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
}

function applyNoneEffect () {
  removeLastEffect();
  imgUploadPreviewElement.classList.add('effects__preview--none');
  depthEffectRange.classList.add('hidden');
}

function applyChromeEffect () {
  removeLastEffect();
  imgUploadPreviewElement.classList.add('effects__preview--chrome');
  depthEffectRange.classList.remove('hidden');

  noUiSlider.create(sliderElement, EFFECTS.CHROME);
  uploadStyle('grayscale');
}

function applySepiaEffect () {
  removeLastEffect();
  imgUploadPreviewElement.classList.add('effects__preview--sepia');
  depthEffectRange.classList.remove('hidden');

  noUiSlider.create(sliderElement, EFFECTS.SEPIA);
  uploadStyle('sepia');
}

function applyMarvinEffect () {
  removeLastEffect();
  imgUploadPreviewElement.classList.add('effects__preview--marvin');
  depthEffectRange.classList.remove('hidden');

  noUiSlider.create(sliderElement, EFFECTS.MARVIN);
  uploadStyle('invert');
}

function applyPhobosEffect () {
  removeLastEffect();
  imgUploadPreviewElement.classList.add('effects__preview--phobos');
  depthEffectRange.classList.remove('hidden');

  noUiSlider.create(sliderElement, EFFECTS.PHOBOS);
  uploadStyle('blur');
}

function applyHeatEffect () {
  removeLastEffect();
  imgUploadPreviewElement.classList.add('effects__preview--heat');
  depthEffectRange.classList.remove('hidden');

  noUiSlider.create(sliderElement, EFFECTS.HEAT);
  uploadStyle('brightness');
}

function applyEffect (effectId) {
  switch(effectId) {
    case 'effect-none':
      applyNoneEffect();
      break;

    case 'effect-chrome':
      applyChromeEffect();
      break;

    case 'effect-sepia':
      applySepiaEffect();
      break;

    case 'effect-marvin':
      applyMarvinEffect();
      break;

    case 'effect-phobos':
      applyPhobosEffect();
      break;

    case 'effect-heat':
      applyHeatEffect();
      break;
  }
}

function onEffectChange (evt) {
  if (evt.target.closest('.effects__item')) {
    applyEffect(evt.target.id);
  }
}

function addEffect () {
  imgUploadPreviewElement.classList.add('effects__preview--none');
  depthEffectRange.classList.add('hidden');
  effectRadioButton.addEventListener('change', onEffectChange);
}

function removeEffect () {
  removeLastEffect();
  effectRadioButton.removeEventListener('change', onEffectChange);
}

export {addEffect, removeEffect};
