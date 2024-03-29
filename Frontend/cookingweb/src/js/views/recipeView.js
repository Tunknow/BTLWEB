import { View } from './view';
import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';

class RecipeView extends View {
  _errMessage = 'Chúng tôi không thể tìm thấy công thức đó. Vui lòng thử cái khác!';

  servingsElement = document.querySelector('.recipe__info-buttons');
  constructor(parentElement) {
    super(parentElement);
  }

  renderAddHandler(handler) {
    ['load', 'hashchange'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  servingsUpdateHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--increase-servings');
      if (!btn) return;
      handler(+btn.dataset.update);
    });
  }

  bookmarkAddHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btnBookmark = e.target.closest('.btn--bookmark');
      if (!btnBookmark) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
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
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">phút</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">người</span>

          <div class="recipe__info-buttons">
            <button data-update="${
              this._data.servings - 1
            }" class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-update="${
              this._data.servings + 1
            }" class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>



        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg>
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
        <h2 class="heading--2">Thành phần nguyên liệu</h2>
        <ul class="recipe__ingredient-list">

        ${this._data.ingredients.map(this.#generateMarkupIngredients).join('')}


        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">Hướng dẫn chi tiết</h2>
        <p class="recipe__directions-text">
          Công thức này được thiết kế và thử nghiệm cẩn thận bởi
          <span class="recipe__publisher">${this._data.publisher}</span>. Vui 
          lòng kiểm tra hướng dẫn chi tiết của họ.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Hướng dẫn</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
      `;
  }

  #generateMarkupIngredients(ing) {
    return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ing.quantity ? fracty(ing.quantity).toString() : ''
            }</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
        `;
  }
}

export default new RecipeView('recipe');
