const handleSetTitle = (title, container) => {
  const modalTitle = container.querySelector('.modal__title');
  modalTitle.textContent = title;
};

const handleSetBody = (body, container) => {
  const modalBody = container.querySelector('.modal__body');
  modalBody.innerHTML = '';
  modalBody.append(body);
};

const handleCloseModal = () => {
  const modalElement = document.querySelector('.modal');

  if (!modalElement) {
    return;
  }

  modalElement.remove();
  document.body.classList.remove('is-modal-open');
  document.removeEventListener('keydown', handleKeyDown);
};

const handleKeyDown = ({ code }) => {
  if (code === 'Escape') {
    handleCloseModal();
  }
};

const renderModal = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  modal.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>
  `;

  return modal;
};

const addEventListeners = (container) => {
  const modalClose = container.querySelector('.modal__close');
  modalClose.addEventListener('click', handleCloseModal);
};

export default class Modal {
  constructor() {
    this.#render();
  }

  #render() {
    this.elem = renderModal();
    addEventListeners(this.elem);
  }

  open() {
    document.body.prepend(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', handleKeyDown);
  }

  close() {
    handleCloseModal();
  }

  setTitle(title) {
    handleSetTitle(title, this.elem);
  }

  setBody(body) {
    handleSetBody(body, this.elem);
  }
}
