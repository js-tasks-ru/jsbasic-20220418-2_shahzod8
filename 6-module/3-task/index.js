const carouselArrows = ['carousel__arrow_right', 'carousel__arrow_left'];

const generateCustomEvent = (element, id) => {
  element.dispatchEvent(new CustomEvent('product-add', {
    detail: id,
    bubbles: true,
  }));
};

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

const handleDisplayArrow = (number, maxNumber) => {
  const arrows = document.querySelectorAll('.carousel__arrow');

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

const renderCarouselArrow = (arrow) => {
  const htmlArrow = document.createElement('div');
  htmlArrow.classList.add('carousel__arrow', arrow);
  htmlArrow.innerHTML = `<img src="/assets/images/icons/${mappingArrowsImage[arrow]}" alt="icon">`;

  htmlArrow.addEventListener('click', () => {
    const carouselInner = document.querySelector('.carousel__inner');
    const maxSlideNumber = document.querySelectorAll('.carousel__slide').length - 1;

    mappingCarouselArrows[arrow](carouselInner);

    const translateSize = -carouselInner.dataset.currentSlide * carouselInner.offsetWidth;

    carouselInner.style.transform = `translateX(${translateSize}px)`;

    handleDisplayArrow(carouselInner.dataset.currentSlide, maxSlideNumber);
  });

  if (arrow === 'carousel__arrow_left') {
    htmlArrow.style.display = 'none';
  }

  return htmlArrow;
};

const renderCarouselSlide = ({ name, price, image, id }) => {
  const carouselSlide = document.createElement('div');
  carouselSlide.classList.add('carousel__slide');
  carouselSlide.dataset.id = id;

  carouselSlide.innerHTML = `
      <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
    `;

  const carouselButton = carouselSlide.querySelector('button');
  carouselButton.addEventListener('click', ({ target }) => generateCustomEvent(target, id));

  return carouselSlide;
};

const renderCarousel = (slides) => {
  const carousel = document.createElement('div');
  carousel.classList.add('carousel');

  carouselArrows.forEach((arrow) => {
    carousel.append(renderCarouselArrow(arrow));
  });

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel__inner');
  carouselInner.dataset.currentSlide = '0';

  slides.forEach((slide) => {
    const carouselSlide = renderCarouselSlide(slide);
    carouselInner.append(carouselSlide);
  });

  carousel.append(carouselInner);
  return carousel;
};

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.getElem();
  }

  getElem() {
    return renderCarousel(this.slides);
  }
}
