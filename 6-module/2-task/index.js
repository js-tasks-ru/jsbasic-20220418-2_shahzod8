const generateCustomEvent = (element, id) => {
  element.dispatchEvent(new CustomEvent('product-add', {
    detail: id,
    bubbles: true,
  }));
};

const renderCardButton = (id) => {
  const cardButton = document.createElement('button');
  cardButton.type = 'button';
  cardButton.classList.add('card__button');
  cardButton.innerHTML = '<img src="/assets/images/icons/plus-icon.svg" alt="icon">';
  cardButton.addEventListener('click', ({ target }) => generateCustomEvent(target, id));

  return cardButton;
};

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
      </div>
    `;

  const cardBody = card.querySelector('.card__body');
  cardBody.append(renderCardButton(id));

  return card;
};

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.getElem();
  }

  getElem() {
    return renderCard(this.product);
  }
}
