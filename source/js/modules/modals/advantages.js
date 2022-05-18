const advantagesCards = document.querySelectorAll('[data-advantage-card]');

const onAdvantgeCardClick = (evt) => {
  const advantageCard = evt.target.closest('.advantages__item');

  advantagesCards.forEach((card) => {
    if (card.getAttribute('data-advantage-card') !== advantageCard.getAttribute('data-advantage-card')) {
      card.classList.remove('advantages__item--active');
    }
  });

  if (advantageCard) {
    advantageCard.classList.toggle('advantages__item--active');
  }
};

const activateAdvantagesCards = () => {
  if (advantagesCards.length) {
    advantagesCards.forEach((card) => card.addEventListener('click', onAdvantgeCardClick));
  }
};

activateAdvantagesCards();
