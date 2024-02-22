import icons from 'url:../../img/icons.svg';

export class View {
  _errMessage = 'Not Found! (404)';
  _successMessage = '';
  _data;

  constructor(parentElement) {
    this.parentElement = document.querySelector(`.${parentElement}`);
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(
      this.parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const currentEl = currentElements[i];
      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currentEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currentEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
    `;

    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderForm() {
    const markup =`
        <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Thông tin món ăn</h3>
          <label>Tiêu đề</label>
          <input value="TEST" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST" required name="sourceUrl" type="text" />
          <label>URL ảnh</label>
          <input value="TEST" required name="image" type="text" />
          <label>Tác giả</label>
          <input value="TEST" required name="publisher" type="text" />
          <label>Thời gian</label>
          <input value="20" required name="cookingTime" type="number" />
          <label>Khẩu phần</label>
          <input value="4" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Nguyên liệu</h3>
          <label>Nguyên liệu 1</label>
          <input
            value="0.5;kg;Gạo"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity; Unit; Description'"
          />
          <label>Nguyên liệu 2</label>
          <input
            value="1;muống;muối"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity; Unit; Description'"
          />
          <label>Nguyên liệu 3</label>
          <input
            value=";;tiêu"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity; Unit; Description'"
          />
          <label>Nguyên liệu 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity; Unit; Description'"
          />
          <label>Nguyên liệu 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity; Unit; Description'"
          />
          <label>Nguyên liệu 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity; Unit; Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Thêm công thức</span>
        </button>
      </form>
    `;
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError() {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${this._errMessage}</p>
    </div>
    `;
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccess() {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${this._successMessage}</p>
    </div>
    `;

    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear(el = this.parentElement) {
    el.innerHTML = '';
  }
}
