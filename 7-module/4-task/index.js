import OldStepSlider, { renderProgress } from "../3-task/index.js";

const getProgress = (container, steps, coordinate) => {
  const left = coordinate - container.getBoundingClientRect().left;
  let leftRelative = left / container.offsetWidth;

  if (leftRelative < 0) {
    leftRelative = 0;
  }

  if (leftRelative > 1) {
    leftRelative = 1;
  }

  const percent = leftRelative * 100;
  const segments = steps - 1;
  const approximateValue = leftRelative * segments;
  const value = Math.round(approximateValue);

  return { percent, value };
};

const addDragAndDrop = (container, steps) => {
  const sliderThumb = container.querySelector('.slider__thumb');
  sliderThumb.ondragstart = () => false;

  sliderThumb.addEventListener('pointerdown', (event) => {
    event.preventDefault();

    container.classList.add('slider_dragging');

    const handlePointerMove = (event) => {
      event.preventDefault();

      const { percent, value } = getProgress(container, steps, event.clientX);
      renderProgress(container, percent, value);
    };

    document.addEventListener('pointermove', handlePointerMove);

    sliderThumb.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', handlePointerMove);
      container.classList.remove('slider_dragging');

      container.dispatchEvent(new CustomEvent('slider-change', {
        detail: +container.querySelector('.slider__value').dataset.value,
        bubbles: true,
      }));
    });
  });
};

export default class StepSlider extends OldStepSlider {
  constructor({ steps, value = 0 }) {
    super({ steps, value });
    super._render();
  }

  _addEventListener() {
    super._addEventListener();
    addDragAndDrop(this.elem, this._steps);
  }
}

