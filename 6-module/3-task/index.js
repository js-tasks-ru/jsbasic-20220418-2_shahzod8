const carouselArrows = ['carousel__arrow_right', 'carousel__arrow_left'];

const mappingArrowsImage = {
  'carousel__arrow_right': 'angle-icon.svg',
  'carousel__arrow_left': 'angle-left-icon.svg',
};

const mappingCarouselArrows = {
  'carousel__arrow_right': (carouselInner) => {
    carouselInner.dataset.currentSlide = +carouselInner.dataset.currentSlide + 1;
  },
  'carousel__arrow_left': (carouselInner) => {
    carouselInner.dataset.currentSlide = +carouselInner.dataset.currentSlide - 1;
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
    carousel.innerHTML += renderCarouselArrow(arrow);
  });

  carousel.innerHTML += `
    <div class="carousel__inner" data-current-slide="0">
      ${slides.map((slide) => renderCarouselSlide(slide)).join('')}
    </div>
  `;

  return carousel;
};

const generateCustomEvent = (element, id) => {
  element.dispatchEvent(new CustomEvent('product-add', {
    detail: id,
    bubbles: true,
  }));
};

const handleDisplayArrow = (number, maxNumber, container) => {
  const arrows = container.querySelectorAll('.carousel__arrow');

  if (!arrows) {
    return;
  }

  switch (number) {
  case '0':
    arrows[1].style.display = 'none';
    break;
  case String(maxNumber):
    arrows[0].style.display = 'none';
    break;
  default:
    arrows.forEach((arrow) => {
      arrow.style.display = '';
    });
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
    carouselButton.addEventListener('click',
      ({target}) => generateCustomEvent(target, slide.dataset.id)
    );
  });
};

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render() {
    this.elem = renderCarousel(this.slides);
    addEventListener(this.elem);
  }
}
