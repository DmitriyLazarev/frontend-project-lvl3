import i18next from 'i18next';

const modalFooter = () => {
  const modalFooterBlock = document.createElement('div');
  modalFooterBlock.classList.add('modal-footer');

  const modalFooterLink = document.createElement('a');
  modalFooterLink.setAttribute('target', '_blank');
  modalFooterLink.classList.add('btn', 'btn-primary', 'modal-read');
  modalFooterLink.textContent = i18next.t('modal.read');

  const modalFooterButton = document.createElement('a');
  modalFooterButton.setAttribute('type', 'button');
  modalFooterButton.setAttribute('data-bs-dismiss', 'modal');
  modalFooterButton.classList.add('btn', 'btn-secondary');
  modalFooterButton.textContent = i18next.t('modal.close');

  modalFooterBlock.append(modalFooterLink, modalFooterButton);

  return modalFooterBlock;
};

export default modalFooter;
