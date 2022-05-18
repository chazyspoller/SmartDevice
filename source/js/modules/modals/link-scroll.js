const linksWithScroll = document.querySelectorAll('[data-link-scroll]');

const scrollToElement = (evt) => {
  const id = evt.target.closest('a').getAttribute('href');
  const elementToGo = id.length > 1 ? document.querySelector(id) : null;

  if (id.length > 1) {
    evt.preventDefault();
  }

  if (elementToGo) {
    elementToGo.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

const activateScroll = () => {
  if (linksWithScroll.length) {
    linksWithScroll.forEach((link) => link.addEventListener('click', scrollToElement));
  }
};

activateScroll();
