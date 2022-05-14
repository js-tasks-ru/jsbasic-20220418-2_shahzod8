export const getProgress = (container, steps, coordinate) => {
  const left = coordinate - container.getBoundingClientRect().left;
  const leftRelative = left / container.offsetWidth;
  const segments = steps - 1;
  const approximateValue = leftRelative * segments;
  const value = Math.round(approximateValue);
  const percent = value / segments * 100;

  return { percent, value };
};

export const renderProgress = (container, percent, value) => {
  const sliderSteps = container.querySelectorAll('.slider__steps > span');
  const sliderValue = container.querySelector('.slider__value');
  const sliderThumb = container.querySelector('.slider__thumb');
  const sliderProgress = container.querySelector('.slider__progress');

  sliderSteps.forEach((step) => {
    if (+step.dataset.value === value) {
      step.classList.add('slider__step-active');
    } else {
      step.classList.remove('slider__step-active');
    }
  });

  sliderThumb.style.left = `${percent}%`;
  sliderProgress.style.width = `${percent}%`;
  sliderValue.textContent = value;
  sliderValue.dataset.value = value;
};

const renderStepSlider = (steps, value) => {
  const slider = document.createElement('div');
  slider.classList.add('slider');

  slider.innerHTML = `
    <div class="slider__thumb">
        <span class="slider__value" data-value="${value}">${value}</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
      ${Array(steps)
        .fill('')
        .map((step, index) => `<span data-value="${index}"></span>`)
        .join('')}
    </div>
  `;

  renderProgress(slider, 25 * value, value);

  return slider;
};

const addEventListeners = (container, steps) => {
  container.addEventListener('click', (event) => {
    const { percent, value } = getProgress(container, steps, event.clientX);

    renderProgress(container, percent, value);

    container.dispatchEvent(new CustomEvent('slider-change', {
      detail: value,
      bubbles: true,
    }));
  });
};

export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this._render();
  }

  _addEventListeners() {
    addEventListeners(this.elem, this.steps);
  }

  _render() {
    this.elem = renderStepSlider(this.steps, this.value);
    this._addEventListeners();
  }
}
