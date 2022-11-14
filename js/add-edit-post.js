import postApi from './api/postApi';
import { initPostForm } from './utils/post-form';

(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');

    const defaultValues = postId
      ? await postApi.getById(postId)
      : {
          title: '',
          description: '',
          author: '',
          imageUrl: '',
        };

    // if (postId) {
    //   defaultValues = await postApi.getById(postId);
    // }

    initPostForm({
      formId: 'postForm',
      defaultValues,
      onSubmit: (formValues) => console.log(formValues),
    });
  } catch (error) {
    console.log(error);
  }
})();
