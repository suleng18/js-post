function showModal(modalElement) {
  const modal = new window.bootstrap.Modal(modalElement);
  if (modal) modal.show();
}

export function registerLightbox({ modalId, imgSelector, prevSelector, nextSelector }) {
  // handle click for all imgs --> event delegation
  const modalElement = document.getElementById(modalId);
  if (!modalElement) return;

  if (Boolean(modalElement.dataset.registered)) return;

  let imgList;
  let currentIndex = 0;

  const imageElement = modalElement.querySelector(imgSelector);
  const prevButton = modalElement.querySelector(prevSelector);
  const nextButton = modalElement.querySelector(nextSelector);
  if (!imageElement || !prevButton || !nextButton) return;

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src;
  }

  document.addEventListener('click', (e) => {
    const { target } = e;
    if (target.tagName !== 'IMG' || !target.dataset.album) return;

    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`);
    currentIndex = [...imgList].findIndex((x) => x === target);
    showImageAtIndex(currentIndex);
    showModal(modalElement);
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
    showImageAtIndex(currentIndex);
  });
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imgList.length;
    showImageAtIndex(currentIndex);
  });

  modalElement.dataset.registered = 'true';
}
