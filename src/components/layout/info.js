import i18next from 'i18next';

const infoLayout = () => {
  const title = document.createElement('h1');
  title.classList.add('display-3', 'mb-0');
  title.textContent = i18next.t('title');

  const description = document.createElement('p');
  description.classList.add('lead');
  description.textContent = i18next.t('description');

  return [title, description];
};

export default infoLayout;
