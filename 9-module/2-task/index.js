import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.renderCarousel();
    this.renderRibbonMenu();
    this.renderStepSlider();
    this.renderCartIcon();

    this.cart = new Cart(this.cartIcon);

    this.products = await this.fetchProducts();
    await this.renderProductsGrid();

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.addEventListeners();
  }

  renderCarousel() {
    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
  }

  renderRibbonMenu() {
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
  }

  renderCartIcon() {
    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
  }

  renderProductsGrid() {
    this.productsGrid = new ProductsGrid(this.products);
    document.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);
  }

  async fetchProducts() {
    const response = await fetch('./products.json');
    return response.json();
  }

  addEventListeners() {
    document.body.addEventListener('product-add', ({ detail }) => {
      const product = this.getProduct(detail);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener('slider-change', ({ detail }) => {
      this.productsGrid.updateFilter({ maxSpiciness: detail });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', ({ detail }) => {
      this.productsGrid.updateFilter({ category: detail });
    });

    document.querySelector('#nuts-checkbox')
      .addEventListener('change', ({ target: { checked } }) => {
        this.productsGrid.updateFilter({ noNuts: checked });
      });

    document.querySelector('#vegeterian-checkbox')
      .addEventListener('change', ({ target: { checked } }) => {
        this.productsGrid.updateFilter({ vegeterianOnly: checked });
      });
  }

  getProduct(id) {
    return this.products.find((product) => product.id === id);
  }
}
