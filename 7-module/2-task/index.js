const handleCloseModal = () => {
  const modalElement = document.querySelector('.modal');
  modalElement.remove();
  document.body.classList.remove('is-modal-open');
  document.removeEventListener('keydown', handleKeyDown);
};

const handleKeyDown = ({ code }) => {
  if (code === 'Escape') {
    handleCloseModal();
  }
};

const renderModal = (title, body) => {
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

  const modalTitle = modal.querySelector('.modal__title');
  modalTitle.textContent = title;

  const modalBody = modal.querySelector('.modal__body');
  modalBody.append(body);

  return modal;
};

const addEventListener = (container) => {
  const modalClose = container.querySelector('.modal__close');
  modalClose.addEventListener('click', handleCloseModal);
};

export default class Modal {
  #title = '';
  #body = '';
  #elem = '';

  constructor() {
    this.#render();
  }

  #render() {
    this.#elem = renderModal(this.#title, this.#body);
    addEventListener(this.#elem);
  }

  open() {
    document.body.prepend(this.#elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', handleKeyDown);
  }

  close() {
    handleCloseModal();
  }

  setTitle(title) {
    this.#title = title;
    this.#render();
  }

  setBody(body) {
    this.#body = body;
    this.#render();
  }
}
