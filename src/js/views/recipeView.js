import View from './View';
import icons from '../../img/icons.svg';
// import { Fraction } from 'fractions';

class RecipeView extends View {
  // private properties
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find the recipe. Please try another one.';
  _successMessage = '';

  addHanlderRender(hanlder) {
    // load recipe as hash changes or page loads
    ['hashchange', 'load'].forEach(item =>
      window.addEventListener(item, hanlder)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const update = +btn.dataset.update;
      if (update > 0) handler(update);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
         <img src="${this._data.image_url}" alt=${
      this._data.title
    } class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this._data.title}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  this._data.cooking_time
                }</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  this._data.servings
                }</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--increase-servings" data-update="${
                    this._data.servings - 1
                  }">
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--increase-servings" data-update="${
                    this._data.servings + 1
                  }">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated ${
                this._data.key ? '' : 'hidden'
              }" >
           
            <svg class="">
              <use href="${icons}#icon-user"></use>
            </svg>
              </div>
              <button class="btn--round btn--bookmark">
                <svg class="">
                  <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
                </svg>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
              ${this._data.ingredients
                .map(this._generateMarkupIngredient)
                .join('')}
               

               
              </ul>
            </div>

            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publish>${
                  this._data.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${this._data.source_url}"></use>
                </svg>
              </a>
            </div>
            `;
  }

  _generateMarkupIngredient(item) {
    return `
        <li class="recipe__ingredient">
             <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
            </svg>
             <div class="recipe__quantity">${
               item.quantity ? item.quantity.toString() : ''
             }</div>
             <div class="recipe__description">
                        <span class="recipe__unit">${item.unit}</span>
                        ${item.description}
              </div>
          </li>
                `;
  }
}

export default new RecipeView();
