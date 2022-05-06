const form = (dataContainer) => {
    const form = document.createElement('form');
    form.classList.add('rss-form', 'text-body');

    const input = document.createElement('input');
    const name = 'rss-link';
    input.setAttribute('type', 'url');
    input.setAttribute('name', name);
    input.setAttribute('id', name);
    input.setAttribute('autofocus', 'true');
    input.setAttribute('required', 'true');
    input.setAttribute('placeholder', 'https://example.com/example.rss');
    input.classList.add('form-control', 'w-100', 'form-control-lg');

    const inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', name);
    inputLabel.classList.add('text-white', 'mb-2');
    inputLabel.textContent = 'Ссылка RSS';

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5', 'mt-4');
    submitButton.textContent = 'Добавить';

    form.append(inputLabel, input, submitButton);
    dataContainer.append(form);
};

export default form;
