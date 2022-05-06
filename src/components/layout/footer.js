const footerLayout = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer', 'py-3', 'border-top', 'bg-light');

    const footerContainer = document.createElement('div');
    footerContainer.classList.add('container-xl');

    const footerTextBlock = document.createElement('p');
    footerTextBlock.classList.add('text-center', 'mb-0');
    footerTextBlock.textContent = 'created by Dmitriy Lazarev';

    footerContainer.append(footerTextBlock);
    footer.append(footerContainer);

    return footer;
}

export default footerLayout;
