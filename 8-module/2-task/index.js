import ProductCard from '../../6-module/2-task/index.js';

const mappingFilters = {
  noNuts: (value, product) => {
    if (!value) {
      return true;
    }

    return product.nuts !== value;
  },
  vegeterianOnly: (value, product) => {
    if (!value) {
      return true;
    }

    return product.vegeterian === value;
  },
  maxSpiciness: (value, product) => product.spiciness <= value,
  category: (value, product) => {
    if (value === '') {
      return true;
    }

    return product.category === value;
  },
};

const getFilteredProducts = (products, filters) => products
  .filter((product) => {
    const activeFilters = Object.entries(filters);

    if (activeFilters.length === 0) {
      return true;
    }

    return activeFilters
      .every(([filterName, filterValue]) => mappingFilters[filterName](filterValue, product));
  });

const renderProductsGridInner = (products) => {
  const productGridInner = document.createElement('div');
  productGridInner.classList.add('products-grid__inner');

  productGridInner.append(...products.map((product) => {
    const productCard = new ProductCard(product);
    return productCard.elem;
  }));

  return productGridInner;
};

const renderProductsGrid = (products, filters) => {
  const productGrid = document.createElement('div');
  productGrid.classList.add('products-grid');

  const filteredProducts = getFilteredProducts(products, filters);

  productGrid.append(renderProductsGridInner(filteredProducts));

  return productGrid;
};

const addEventListeners = () => {};

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
  }

  #render() {
    this.elem = renderProductsGrid(this.products, this.filters);
    addEventListeners(this.elem);
  }

  updateFilter(filters) {
    this.filters = { ...this.filters, ...filters };

    this.elem.innerHTML = '';
    const filteredProducts = getFilteredProducts(this.products, this.filters);

    this.elem.append(renderProductsGridInner(filteredProducts));
  }
}
