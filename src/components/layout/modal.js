import i18next from 'i18next';

const modalLayout = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('tabindex', '-1');
  modal.id = 'modal';

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

  const modalHeaderTitle = document.createElement('h5');
  modalHeaderTitle.classList.add('modal-title');

  const modalHeaderButton = document.createElement('h5');
  modalHeaderButton.classList.add('btn-close');
  modalHeaderButton.setAttribute('type', 'button');
  modalHeaderButton.setAttribute('data-bs-dismiss', 'modal');
  modalHeaderButton.setAttribute('aria-label', i18next.t('modal.close'));

  modalHeader.append(modalHeaderTitle, modalHeaderButton);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');

  const modalFooterLink = document.createElement('a');
  modalFooterLink.setAttribute('target', '_blank');
  modalFooterLink.classList.add('btn', 'btn-primary', 'modal-read');
  modalFooterLink.textContent = i18next.t('modal.read');

  const modalFooterButton = document.createElement('a');
  modalFooterButton.setAttribute('type', 'button');
  modalFooterButton.setAttribute('data-bs-dismiss', 'modal');
  modalFooterButton.classList.add('btn', 'btn-secondary');
  modalFooterButton.textContent = i18next.t('modal.close');

  modalFooter.append(modalFooterLink, modalFooterButton);

  modalContent.append(modalHeader, modalBody, modalFooter);
  modalDialog.append(modalContent);
  modal.append(modalDialog);
  return modal;
};

export default modalLayout;
