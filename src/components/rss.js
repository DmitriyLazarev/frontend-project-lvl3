import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import i18next from 'i18next';
import ru from '../locales/ru.js';
import baseLayout from './layout/base.js';
import form from './main/form/form.js';

export default () => {
  i18next.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  }).then(() => {
    Array.from(document.querySelectorAll('.toast'))
      .forEach((toastNode) => new Modal(toastNode));

    const globalState = {
      form: {
        processState: 'filling',
        errors: {},
        valid: true,
      },
      urls: [],
      feeds: [],
      posts: [],
      readPosts: [],
      activePostId: null,
    };

    const [dataContainer, resultContainer] = baseLayout();
    form(globalState, dataContainer, resultContainer);
  });
};
