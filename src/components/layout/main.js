const mainLayout = () => {
    const main = document.createElement('main');
    main.classList.add('flex-grow-1', 'd-flex', 'flex-column');

    const dataContainer = document.createElement('section');
    dataContainer.classList.add('container-fluid', 'bg-dark',  'p-5', 'text-white');

    const resultContainer = document.createElement('section');
    resultContainer.classList.add('container-fluid', 'flex-grow-1', 'p-5');

    main.append(dataContainer, resultContainer);

    return [main, dataContainer, resultContainer];
}

export default mainLayout;
