import postApi from './api/postApi';
import { initPagination, initSearch, renderPostList, renderPagination, toast } from './utils';

async function handleFileChange(filterName, filterValue) {
  try {
    // update  queryparams
    const url = new URL(window.location);
    if (filterName) url.searchParams.set(filterName, filterValue);

    if (filterName === 'title_like') url.searchParams.set('_page', 1);
    history.pushState({}, '', url);

    // fetch API
    // re-renderPostList
    const { data, pagination } = await postApi.getAll(url.searchParams);
    renderPostList('postList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log(error);
  }
}

function registerPostDeleteEvent() {
  document.addEventListener('post-delete', async (event) => {
    try {
      const post = event.detail;
      const message = `Are you sure you want to delete post "${post.title}"?`;
      if (window.confirm(message)) {
        await postApi.remove(post.id);
        await handleFileChange();

        toast.success('Remove post successfully 🙈');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  });
}

// Main
(async () => {
  try {
    const url = new URL(window.location);

    // update searchParams if needed
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

    history.pushState({}, '', url);
    const queryParams = url.searchParams;

    registerPostDeleteEvent();

    // attach click event for links
    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: (page) => handleFileChange('_page', page),
    });

    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFileChange('title_like', value),
    });

    // re-render postList baseURL params
    // const queryparams = new URLSearchParams(window.location.search);
    const { data, pagination } = await postApi.getAll(queryParams);
    renderPostList('postList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log(error);
  }
})();
