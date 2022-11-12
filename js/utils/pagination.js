import { getUlPagination } from './selector';

export function renderPagination(elementId, pagination) {
  const ulPaginnation = document.getElementById(elementId);
  if (!pagination || !ulPaginnation) return;

  // calculate totalPages
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  // save page and totalPages to ulPaginnation
  ulPaginnation.dataset.page = _page;
  ulPaginnation.dataset.totalPages = totalPages;

  if (_page <= 1) ulPaginnation.firstElementChild.classList.add('disabled');
  else ulPaginnation.firstElementChild.classList.remove('disabled');

  if (_page >= totalPages) ulPaginnation.lastElementChild.classList.add('disabled');
  else ulPaginnation.lastElementChild.classList.remove('disabled');
}

export function initPagination({ elementId, defaultParams, onChange }) {
  // bind click event for Prev and Next buttons
  const ulPaginnation = document.getElementById(elementId);
  if (!ulPaginnation) return;

  const prevLink = ulPaginnation.firstElementChild?.firstElementChild;
  if (prevLink)
    prevLink.addEventListener('click', (e) => {
      e.preventDefault();

      const page = Number.parseInt(ulPaginnation.dataset.page) || 1;
      if (page >= 2) onChange?.(page - 1);
    });

  const nextLink = ulPaginnation.lastElementChild?.lastElementChild;
  if (nextLink)
    nextLink.addEventListener('click', (e) => {
      e.preventDefault();

      const page = Number.parseInt(ulPaginnation.dataset.page) || 1;
      const totalPages = ulPaginnation.dataset.totalPages;
      if (page < totalPages) onChange?.(page + 1);
    });
}
