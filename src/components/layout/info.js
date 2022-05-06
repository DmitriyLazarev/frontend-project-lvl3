const infoLayout = (titleText = '', descriptionText = '') => {
    const title = document.createElement('h1');
    title.classList.add('display-3', 'mb-0');
    title.textContent = titleText;

    const description = document.createElement('p');
    description.classList.add('lead');
    description.textContent = descriptionText;

    return [title, description];
};

export default infoLayout;
