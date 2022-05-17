import i18next from 'i18next';

const modalHeader = () => {
  const modalHeaderBlock = document.createElement('div');
  modalHeaderBlock.classList.add('modal-header');

  const modalHeaderTitle = document.createElement('h5');
  modalHeaderTitle.classList.add('modal-title');

  const modalHeaderButton = document.createElement('h5');
  modalHeaderButton.classList.add('btn-close');
  modalHeaderButton.setAttribute('type', 'button');
  modalHeaderButton.setAttribute('data-bs-dismiss', 'modal');
  modalHeaderButton.setAttribute('aria-label', i18next.t('modal.close'));

  modalHeaderBlock.append(modalHeaderTitle, modalHeaderButton);

  return modalHeaderBlock;
};

export default modalHeader;
