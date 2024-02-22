class SearchView {
  _errMessage = 'Không thấy công thức nào với yêu cầu tìm kiếm của bạn! Vui lòng thử lại.';

  constructor(parentElement) {
    this.parentElement = document.querySelector(`.${parentElement}`);
  }

  searchAddHandler(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const input = this.parentElement.querySelector('.search__field');
    const query = input.value;
    input.value = '';
    return query;
  }
}

export default new SearchView('search');
