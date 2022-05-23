const aboutMoreBtn = document.querySelector('[data-link-more]');
const textMore = document.querySelector('.about__text-inactive');
const aboutWrapper = document.querySelector('.about__wrapper');

const onMoreBtnClick = (evt) => {
  evt.preventDefault();
  aboutMoreBtn.classList.toggle('about__link--active');
  textMore.classList.toggle('about__text-inactive');
  aboutWrapper.classList.toggle('about__wrapper--active-text');
};

const activateMoreBtn = () => {
  if (aboutMoreBtn && textMore) {
    aboutMoreBtn.addEventListener('click', onMoreBtnClick);
  }
};

activateMoreBtn();
