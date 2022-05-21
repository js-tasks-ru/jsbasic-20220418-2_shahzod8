const ribbonArrows = ['ribbon__arrow_left', 'ribbon__arrow_right'];

const mappingRibbonArrows = {
  'ribbon__arrow_left': (inner) => () => {
    inner.scrollBy(-350, 0);
  },
  'ribbon__arrow_right': (inner) => () => {
    inner.scrollBy(350, 0);
  },
};

const renderRibbonMenuArrow = (arrow, index) => `
  <button class="ribbon__arrow ${arrow}${index === 1 ? ' ribbon__arrow_visible' : ''}">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>
`;

const renderRibbonInnerItem = ({ id, name }, index) => `
  <a
    href="#"
    class="ribbon__item${index === 0 ? ' ribbon__item_active' : ''}"
    data-id="${id}"
  >${name}</a>
`;

const renderRibbonInner = (categories) => `
  <nav class="ribbon__inner">
    ${categories.map(renderRibbonInnerItem).join('')}
  </nav>
`;

const renderRibbonMenu = (categories) => {
  const ribbon = document.createElement('div');
  ribbon.classList.add('ribbon');

  ribbonArrows.forEach((arrow, index) => {
    ribbon.insertAdjacentHTML('beforeend', renderRibbonMenuArrow(arrow, index));
  });

  ribbon.firstElementChild.insertAdjacentHTML('afterend',
    renderRibbonInner(categories)
  );

  return ribbon;
};

const removeRibbonItemActiveClass = (item) => item.classList.remove('ribbon__item_active');

const handleDisplayArrow = (container) => ({ target }) => {
  const leftArrow = container.querySelector('.ribbon__arrow_left');
  const rightArrow = container.querySelector('.ribbon__arrow_right');

  const scrollLeft = target.scrollLeft;

  if (scrollLeft < 1) {
    leftArrow.classList.remove('ribbon__arrow_visible');
    return;
  }

  const scrollWidth = target.scrollWidth;
  const clientWidth = target.clientWidth;

  const scrollRight = scrollWidth - scrollLeft - clientWidth;

  if (scrollRight < 1) {
    rightArrow.classList.remove('ribbon__arrow_visible');
    return;
  }

  leftArrow.classList.add('ribbon__arrow_visible');
  rightArrow.classList.add('ribbon__arrow_visible');
};

const addEventListeners = (container) => {
  const ribbonInner = container.querySelector('.ribbon__inner');

  ribbonInner.addEventListener('click', ({ target }) => {
    container.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: target.dataset.id,
      bubbles: true,
    }));
  });

  const ribbonItems = ribbonInner.querySelectorAll('.ribbon__item');

  ribbonItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      ribbonItems.forEach(removeRibbonItemActiveClass);
      event.target.classList.add('ribbon__item_active');
    });
  });

  ribbonArrows.forEach((arrow) => {
    const arrowElement = container.querySelector(`.${arrow}`);
    arrowElement.addEventListener('click', mappingRibbonArrows[arrow](ribbonInner));
  });

  ribbonInner.addEventListener('scroll', handleDisplayArrow(container));
};

export default class RibbonMenu {
  constructor(categories) {
    this.value = categories[0].id;
    this.#render(categories);
  }

  #render(categories) {
    this.elem = renderRibbonMenu(categories);
    addEventListeners(this.elem);
  }
}
