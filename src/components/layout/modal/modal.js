import modalHeader from './modal-header.js';
import modalFooter from './modal-footer.js';

const modalLayout = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('tabindex', '-1');
  modal.id = 'modal';

  const modalDialog = document.createElement('div');
  modalDialog.setAttribute('role', 'document');
  modalDialog.classList.add('modal-dialog');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  modalContent.append(modalHeader(), modalBody, modalFooter());
  modalDialog.append(modalContent);
  modal.append(modalDialog);
  return modal;
};

export default modalLayout;
