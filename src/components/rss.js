import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import baseLayout from "./layout/base";
import form from "./main/form";

export default () => {
    i18next.init({
        lng: 'ru',
        debug: true,
        resources: {
            ru: {
                translation: {
                    "title": "RSS агрегатор",
                    "description": "Начните читать RSS сегодня! Это легко, это красиво."
                }
            }
        }
    }).then(() => {
        const [dataContainer, resultContainer] = baseLayout(i18next.t('title'), i18next.t('description'));
        form(dataContainer);
    });
};
