import View from './View';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks!';

  _generateMarkup() {
    return this._data.map(item => this._generateMarkupPreview(item)).join('');
  }

  addHandlerBookmarks(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkupPreview(item) {
    const id = window.location.hash.slice(1);
    console.log(item.id === id);
    return `
     <li class="preview">
            <a class="preview__link ${
              item.id === id ? 'preview__link--active' : ''
            }"  href="#${item.id}" >
              <figure class="preview__fig">
                <img src="${item.image_url}" alt=${item.title} />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${item.title}</h4>
                <p class="preview__publisher">${item.publisher}</p>
                
              </div>
            </a>
          </li>
    `;
  }
}

export default new BookmarksView();
