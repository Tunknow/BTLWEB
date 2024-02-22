import { View } from './view';
import previewView from './previewView';

class ResultView extends View {
  _errMessage = 'Không thấy công thức nào với yêu cầu tìm kiếm của bạn! Vui lòng thử lại.';

  constructor(parentElement) {
    super(parentElement);
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView('results');
