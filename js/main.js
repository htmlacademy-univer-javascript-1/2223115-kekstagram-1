import {renderThumbnails} from './rendering-thumbnails.js';
import {setUserFormSubmit, closeEditor} from './user-form.js';
import {getDataFromServer} from './api.js';
import {showFilters, setFilter} from './photo-filter.js';
import {debounce} from './util.js';

const TIMEOUT_DELAY = 500;

getDataFromServer((data) => {
  renderThumbnails(data);
  showFilters();
  setFilter(debounce((filterData) => renderThumbnails(filterData(data)), TIMEOUT_DELAY));
});

setUserFormSubmit(closeEditor);

