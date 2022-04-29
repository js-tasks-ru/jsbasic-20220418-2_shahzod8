function toggleText() {
  const toggleTextButton = document.querySelector('.toggle-text-button');
  const text = document.querySelector('#text');

  toggleTextButton.addEventListener('click', () => {
    text.hidden = !text.hidden;
  });
}
