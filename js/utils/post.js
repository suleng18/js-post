import dayjs from 'dayjs';
import reletiveTime from 'dayjs/plugin/relativeTime';
import { setTextContent, truncateText } from './common';

dayjs.extend(reletiveTime);

export function createPostElement(post) {
  if (!post) return;

  // find and clone the template
  const postTemplate = document.getElementById('postItemTemplate');
  if (!postTemplate) return;
  const liElement = postTemplate.content.firstElementChild.cloneNode(true);

  // update title, description, author
  setTextContent(liElement, '[data-id="title"]', post.title);
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100));
  setTextContent(liElement, '[data-id="author"]', post.author);

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;
    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thumbnail';
    });
  }

  // calculate timestamp
  setTextContent(liElement, '[data-id="timeSpan"]', `- ${dayjs(post.updatedAt).fromNow()}`);

  return liElement;

  // attach event
}

export function renderPostList(elementId, postList) {
  if (!Array.isArray(postList)) return;

  const ulElement = document.getElementById(elementId);
  if (!ulElement) return;

  ulElement.textContent = '';

  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}
