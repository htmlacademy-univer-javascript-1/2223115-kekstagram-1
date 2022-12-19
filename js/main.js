import {renderThumbnails} from './rendering-thumbnails.js';
import {setUserFormSubmit, closeEditor} from './user-form.js';
import {getDataFromServer} from './api.js';
import {showFilters, setFilter, TIMEOUT_DELAY} from './photo-filter.js';
import {debounce} from './util.js';

getDataFromServer((data) => {
  renderThumbnails(data);
  showFilters();
  setFilter(debounce((filterData) => renderThumbnails(filterData(data)), TIMEOUT_DELAY));
});

setUserFormSubmit(closeEditor);
