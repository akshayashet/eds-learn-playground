import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.replaceChildren(ul);

  // Show only 4 cards initially if there are more than 4
  const cards = ul.querySelectorAll('li');
  if (cards.length > 4) {
    cards.forEach((card, index) => {
      if (index >= 4) {
        card.style.display = 'none';
      }
    });

    // Create "Show More" button
    const showMoreBtn = document.createElement('button');
    showMoreBtn.textContent = 'Show More';
    showMoreBtn.className = 'cards-show-more';

    showMoreBtn.addEventListener('click', () => {
      const hiddenCards = ul.querySelectorAll('li[style*="display: none"]');
      if (hiddenCards.length > 0) {
        hiddenCards.forEach((card) => {
          card.style.display = '';
        });
        showMoreBtn.textContent = 'Show Less';
      } else {
        cards.forEach((card, index) => {
          if (index >= 4) {
            card.style.display = 'none';
          }
        });
        showMoreBtn.textContent = 'Show More';
      }
    });

    block.append(showMoreBtn);
  }
}
