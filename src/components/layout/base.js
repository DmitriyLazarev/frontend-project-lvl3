import modalLayout from './modal/modal.js';
import mainLayout from './main.js';
import footerLayout from './footer.js';
import infoLayout from './info.js';

const baseLayout = () => {
  const { body } = document;
  body.classList.add('d-flex', 'flex-column', 'min-vh-100');

  const [main, dataContainer, resultContainer] = mainLayout();
  const [title, description] = infoLayout();
  const footer = footerLayout();
  const modal = modalLayout();

  body.append(modal, main, footer);
  dataContainer.append(title, description);

  return [dataContainer, resultContainer];
};

export default baseLayout;
