const aboutMoreBtn = document.querySelector('[data-link-more]');
const textMore = document.querySelectorAll('.about__text--inactive');
const textMoreMobile = document.querySelector('.about__text--inactive-half');

const onMoreBtnClick = (evt) => {
  evt.preventDefault();
  aboutMoreBtn.classList.toggle('about__link--active');
  textMore.forEach((text) => text.classList.toggle('about__text--inactive'));
  textMoreMobile.classList.toggle('about__text--inactive-half');
};

const activateMoreBtn = () => {
  if (aboutMoreBtn && textMore.length) {
    aboutMoreBtn.addEventListener('click', onMoreBtnClick);
  }
};

activateMoreBtn();
