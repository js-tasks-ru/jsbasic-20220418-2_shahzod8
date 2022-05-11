const carouselArrows = ['carousel__arrow_right', 'carousel__arrow_left'];

const mappingArrowsImage = {
  'carousel__arrow_right': 'angle-icon.svg',
  'carousel__arrow_left': 'angle-left-icon.svg',
};

const mappingCarouselArrows = {
  'carousel__arrow_right': (inner) => {
    inner.dataset.currentSlide = +inner.dataset.currentSlide + 1;
  },
  'carousel__arrow_left': (inner) => {
    inner.dataset.currentSlide = +inner.dataset.currentSlide - 1;
  },
};

const renderCarouselArrow = (arrow) => `
  <div
    class="carousel__arrow ${arrow}"
    style="display: ${arrow === 'carousel__arrow_left' ? 'none' : ''}"
  >
    <img src="/assets/images/icons/${mappingArrowsImage[arrow]}" alt="icon">
  </div>
`;

const renderCarouselSlide = ({name, price, image, id}) => `
  <div class="carousel__slide" data-id="${id}">
    <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${price.toFixed(2)}</span>
      <div class="carousel__title">${name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  </div>
`;

const renderCarousel = (slides) => {
  const carousel = document.createElement('div');
  carousel.classList.add('carousel');

  carouselArrows.forEach((arrow) => {
    carousel.insertAdjacentHTML('beforeend', renderCarouselArrow(arrow));
  });

  carousel.insertAdjacentHTML('beforeend',
    `<div class="carousel__inner" data-current-slide="0">
      ${slides.map((slide) => renderCarouselSlide(slide)).join('')}
    </div>`
  );

  return carousel;
};

const generateCustomEvent = (id) => ({ target }) => {
  target.dispatchEvent(new CustomEvent('product-add', {
    detail: id,
    bubbles: true,
  }));
};

const handleDisplayArrow = (number, maxNumber, container) => {
  const leftArrow = container.querySelector('.carousel__arrow_left');
  const rightArrow = container.querySelector('.carousel__arrow_right');

  switch (+number) {
  case 0:
    leftArrow.style.display = 'none';
    break;
  case maxNumber:
    rightArrow.style.display = 'none';
    break;
  default:
    leftArrow.style.display = '';
    rightArrow.style.display = '';
  }
};

const addEventListener = (container) => {
  carouselArrows.forEach((arrow) => {
    const arrowElement = container.querySelector(`.${arrow}`);

    arrowElement.addEventListener('click', () => {
      const carouselInner = container.querySelector('.carousel__inner');
      const maxSlideNumber = container.querySelectorAll('.carousel__slide').length - 1;

      mappingCarouselArrows[arrow](carouselInner);

      const translateSize = -carouselInner.dataset.currentSlide * carouselInner.offsetWidth;

      carouselInner.style.transform = `translateX(${translateSize}px)`;

      handleDisplayArrow(carouselInner.dataset.currentSlide, maxSlideNumber, container);
    });
  });

  const carouselSlides = container.querySelectorAll('.carousel__inner > .carousel__slide');

  carouselSlides.forEach((slide) => {
    const carouselButton = slide.querySelector('.carousel__button');
    carouselButton.addEventListener('click', generateCustomEvent(slide.dataset.id));
  });
};

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.#render();
  }

  #render() {
    this.elem = renderCarousel(this.slides);
    addEventListener(this.elem);
  }
}
