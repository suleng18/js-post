import { setBackgroundImage, setFillValues, setTextContent } from './common';

function setFormValues(form, formValues) {
  setFillValues(form, '[name = "title"]', formValues?.title);
  setFillValues(form, '[name = "author"]', formValues?.author);
  setFillValues(form, '[name = "description"]', formValues?.description);
  setFillValues(form, '[name = "imageUrl"]', formValues?.imageUrl);

  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl);
}
function getFormValues(form) {
  const formValues = {};

  // ['title', 'author', 'description', 'imageUrl'].forEach((name) => {
  //   const field = form.querySelector(`[name="${name}"]`);
  //   if (field) formValues[name] = field.value;
  // });

  const data = new FormData(form);

  for (const [key, value] of data) {
    formValues[key] = value;
  }

  return formValues;
}

function getTitleError(form) {
  const titleElement = form.querySelector('[name="title"]');
  if (!titleElement) return;

  if (titleElement.validity.valueMissing) return 'Please enter a title';

  if (titleElement.value.split(' ').filter((x) => x.length > 3).length < 2) {
    return 'Please enter at  least two words of 3 characters';
  }
  return '';
}

function validatePostForm(form, formValues) {
  const errors = {
    title: getTitleError(form),
  };

  for (const key in errors) {
    const element = form.querySelector(`[name="${key}"]`);
    if (element) {
      element.setCustomValidity(errors[key]);
      setTextContent(element.parentElement, '.invalid-feedback', errors[key]);
    }
  }

  const isValid = form.checkValidity();
  if (!isValid) form.classList.add('was-validated');
  return isValid;
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId);
  if (!form) return;

  setFormValues(form, defaultValues);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formValues = getFormValues(form);
    console.log('🚀 ~ formValues', formValues);

    if (!validatePostForm(form, formValues)) return;
  });
}
