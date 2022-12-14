import {renderThumbnails} from './rendering-thumbnails.js';
import {setUserFormSubmit, closeEditor} from './user-form.js';
import {getDataFromServer} from './api.js';

getDataFromServer((data) => {
  renderThumbnails(data);
});

setUserFormSubmit(closeEditor);
