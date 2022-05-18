const aboutMoreBtn = document.querySelector('[data-link-more]');
const textMore = document.querySelectorAll('.about__text--inactive');

const onMoreBtnClick = (evt) => {
  evt.preventDefault();
  aboutMoreBtn.classList.toggle('about__link--active');
  textMore.forEach((text) => text.classList.toggle('about__text--inactive'));
};

const activateMoreBtn = () => {
  if (aboutMoreBtn && textMore.length) {
    aboutMoreBtn.addEventListener('click', onMoreBtnClick);
  }
};

activateMoreBtn();
