import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

const cartCounterButtons = ['cart-counter__button_minus', 'cart-counter__button_plus'];

const mappingCartCounterButtons = {
  'cart-counter__button_minus': -1,
  'cart-counter__button_plus': 1,
};

const isEarlyAdded = (items, product) => !items
  .find((item) => item.product.id === product.id);

const getIndex = (items, id) => items.findIndex((item) => item.product.id === id);

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let newProduct;

    if (isEarlyAdded(this.cartItems, product)) {
      newProduct = { product, count: 1 };
      this.cartItems = [...this.cartItems, newProduct];
    } else {
      const index = getIndex(this.cartItems, product.id);
      newProduct = { ...this.cartItems[index], count: this.cartItems[index].count + 1 };
      this.cartItems = [...this.cartItems.slice(0, index), newProduct, ...this.cartItems.slice(index + 1)];
    }

    this.onProductUpdate(newProduct);
  }

  updateProductCount(productId, amount) {
    const index = getIndex(this.cartItems, productId);
    const newProductCount = this.cartItems[index].count += amount;
    const newProduct = { ...this.cartItems[index], count: newProductCount };

    if (newProductCount === 0) {
      this.cartItems = [...this.cartItems.slice(0, index), ...this.cartItems.slice(index + 1)];
    } else {
      this.cartItems = [...this.cartItems.slice(0, index), newProduct, ...this.cartItems.slice(index + 1)];
    }

    this.onProductUpdate(newProduct);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, item) => totalCount += item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice += item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    const modalBody = document.createElement('div');
    this.cartItems.forEach((item) => {
      modalBody.append(this.renderProduct(item.product, item.count));
    });
    modalBody.append(this.renderOrderForm());

    this.modal.setBody(modalBody);

    this.addModalEventListeners(modalBody);

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    if (!this.modal) {
      this.cartIcon.update(this);
      return;
    }

    const productIdSelector = `[data-product-id="${cartItem.product.id}"]`;
    const modalBody = this.modal.elem;

    if (cartItem.count === 0) {
      const cartItemElement = modalBody.querySelector(productIdSelector);
      cartItemElement.remove();
    }

    if (modalBody.querySelectorAll('.cart-product').length === 0) {
      this.modal.close();
      this.cartIcon.update(this);
      return;
    }

    const productCount = modalBody.querySelector(`${productIdSelector} .cart-counter__count`);
    const productPrice = modalBody.querySelector(`${productIdSelector} .cart-product__price`);
    const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const modalForm = this.modal.elem.querySelector('.cart-form');

    const submitButton = modalForm.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');

    const data = new FormData(event.target);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: data,
    }).then(() => {
      this.modal.setTitle('Success!');
      this.cartItems = [];

      const newModalBody = createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `);

      this.modal.setBody(newModalBody);
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  addModalEventListeners(modal) {
    const cartProducts = modal.querySelectorAll('.cart-product');

    cartProducts.forEach((product) => {
      const productId = product.dataset.productId;

      cartCounterButtons.forEach((button) => {
        const buttonElement = product.querySelector(`.${button}`);

        buttonElement.addEventListener('click', () => {
          this.updateProductCount(productId, mappingCartCounterButtons[button]);
        });
      });
    });

    const cartForm = modal.querySelector('.cart-form');

    cartForm.addEventListener('submit', (event) => {
      this.onSubmit(event);
    });
  }
}

