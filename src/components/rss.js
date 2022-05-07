import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import baseLayout from './layout/base.js';
import form from './main/form.js';

export default () => {
  i18next.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru: {
        translation: {
          title: 'RSS агрегатор',
          description: 'Начните читать RSS сегодня! Это легко, это красиво.',
          form: {
            inputLabel: 'Ссылка RSS',
            submitButton: 'Добавить',
            errors: {
              wrongUrl: 'Ссылка должна быть валидным URL.',
              required: 'Поле должно быть заполнено.',
              isIncluded: 'RSS уже существует.',
            },
          },
        },
      },
    },
  }).then(() => {
    const [dataContainer] = baseLayout();
    form(dataContainer);
  });
};
