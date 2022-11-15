import postApi from './api/postApi';
import { initPostForm, toast } from './utils';

function removeUnusedFields(formValue) {
  const payload = { ...formValue };

  if (payload.imageSource === 'upload') {
    delete payload.imageUrl;
  } else {
    delete payload.image;
  }

  delete payload.imageSource;

  if (!payload.id) delete payload.id;
  return payload;
}

function jsonToFormData(jsonObject) {
  const formData = new FormData();

  for (const key in jsonObject) {
    formData.set(key, jsonObject[key]);
  }
  return formData;
}

async function handlePostFormSubmit(formValues) {
  try {
    const payload = removeUnusedFields(formValues);
    console.log({ formValues, payload });

    const formData = jsonToFormData(payload);

    const savedPost = formValues.id
      ? await postApi.updateFormData(formData)
      : await postApi.addFormData(formData);

    toast.success('Save post successfully! 🤗');

    setTimeout(() => {
      window.location.assign(`/post-detail.html?id=${savedPost.id}`);
    }, 2000);
  } catch (error) {
    console.log('failed', error);
    toast.error('failed', error.message);
  }
}

(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');

    const defaultValues = Boolean(postId)
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
      onSubmit: handlePostFormSubmit,
    });
  } catch (error) {
    console.log(error);
  }
})();
