function renderArrow(number, maxNumber, arrows) {
  switch (number) {
  case 1:
    arrows[1].style.display = 'none';
    break;
  case maxNumber:
    arrows[0].style.display = 'none';
    break;
  default:
    arrows.forEach((arrow) => {
      arrow.style.display = '';
    });
  }
}

function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselArrows = document.querySelectorAll('.carousel__arrow');

  const carouselWidth = carouselInner.offsetWidth;
  const maxSlideNumber = document.querySelectorAll('.carousel__slide').length;

  let slideNumber = 1;
  let translateSize = 0;

  carouselArrows.forEach((arrow) => {
    arrow.addEventListener('click', () => {
      if (arrow.classList.contains('carousel__arrow_right')) {
        translateSize -= carouselWidth;
        slideNumber += 1;
      } else {
        translateSize += carouselWidth;
        slideNumber -= 1;
      }

      carouselInner.style.transform = `translateX(${translateSize}px)`;
      renderArrow(slideNumber, maxSlideNumber, carouselArrows);
    });
  });

  renderArrow(slideNumber, maxSlideNumber, carouselArrows);
}
