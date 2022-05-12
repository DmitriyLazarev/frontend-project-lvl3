const mainLayout = () => {
  const main = document.createElement('main');
  main.classList.add('flex-grow-1', 'd-flex', 'flex-column');

  const dataContainer = document.createElement('section');
  dataContainer.classList.add('container-fluid', 'bg-dark', 'p-5', 'text-white');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('container', 'text-white');

  const innerRow = document.createElement('div');
  innerRow.classList.add('row', 'text-white');

  const innerCol = document.createElement('div');
  innerCol.classList.add('col', 'text-white');

  innerRow.append(innerCol);
  innerContainer.append(innerRow);
  dataContainer.append(innerContainer);

  const resultContainer = document.createElement('section');
  resultContainer.classList.add('container-fluid', 'flex-grow-1', 'p-5');

  const resultInnerContainer = document.createElement('div');
  resultInnerContainer.classList.add('container');
  resultContainer.append(resultInnerContainer);

  main.append(dataContainer, resultContainer);

  return [main, innerCol, resultInnerContainer];
};

export default mainLayout;
