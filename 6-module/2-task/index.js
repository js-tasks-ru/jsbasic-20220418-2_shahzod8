const renderCard = ({ name, price, image, id }) => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="card__top">
      <img src="/assets/images/products/${image}" class="card__image" alt="product">
      <span class="card__price">€${price.toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${name}</div>
      <button type="button" class="card__button" data-id="${id}">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  `;

  return card;
};

const addEventListener = (container) => {
  const cardButton = container.querySelector('.card__button');

  cardButton.addEventListener('click', () => {
    cardButton.dispatchEvent(new CustomEvent('product-add', {
      detail: cardButton.dataset.id,
      bubbles: true,
    }));
  });
};

export default class ProductCard {
  #product;

  constructor(product) {
    this.#product = product;
    this.#render();
  }

  #render() {
    this.elem = renderCard(this.#product);
    addEventListener(this.elem);
  }
}
