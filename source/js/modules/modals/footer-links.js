const footerLinks = document.querySelectorAll('.footer-links');
const linksSwitcher = document.querySelectorAll('[data-footer-switcher]');

const isExist = linksSwitcher.length && footerLinks.length;

const onLinkSwitcherClick = (evt) => {
  const links = evt.target.closest('.footer-links');

  linksSwitcher.forEach((link) => {
    if (evt.target.getAttribute('data-footer-switcher') !== link.getAttribute('data-footer-switcher')) {
      link.closest('.footer-links').classList.add('footer-links--inactive');
      link.closest('.footer-links').classList.remove('footer-links--active');
    }
  });

  if (links) {
    links.classList.toggle('footer-links--inactive');
    links.classList.toggle('footer-links--active');
  }
};

const activateLinksSwitchers = () => {
  if (isExist) {
    footerLinks.forEach((links) => links.classList.add('footer-links--inactive'));
    linksSwitcher.forEach((link) => {
      link.addEventListener('click', onLinkSwitcherClick);
    });
  }
};

activateLinksSwitchers();
