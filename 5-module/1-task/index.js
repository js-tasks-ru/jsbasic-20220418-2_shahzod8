function hideSelf() {
  const hideSelfButton = document.querySelector('.hide-self-button');

  hideSelfButton.addEventListener('click', ({ target }) => {
    target.hidden = true;
  });
}
