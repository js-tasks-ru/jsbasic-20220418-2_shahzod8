export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.renderCarousel();
  }

  renderCarousel() {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    carousel.innerHTML = this.renderCarouselArrow();

    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel__inner');

    this.slides.forEach((slide) => {
      const carouselSlide = this.renderCarouselSlide(slide);
      carouselInner.append(carouselSlide);
    });

    carousel.append(carouselInner);
    return carousel;
  }

  renderCarouselSlide(slide) {
    const {
      name,
      price,
      image,
      id
    } = slide;

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
    carouselButton.addEventListener('click', ({ target }) => this.generateCustomEvent(target, id));

    return carouselSlide;
  }

  renderCarouselArrow() {
    return `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `;
  }

  generateCustomEvent(element, id) {
    element.dispatchEvent(new CustomEvent('product-add', {
      detail: id,
      bubbles: true,
    }));
  }
}
