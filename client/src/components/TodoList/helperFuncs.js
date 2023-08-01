const getPages = (pageNum) => {
  const pages = [];
  for (let i = 1; i <= pageNum; i++) {
    pages.push(String(i));
  }
  return pages;
};

export const verifyInput = (formData, dispatch, setError) => {
  const regexpEmail = /^[\w.-]+@[\w.-]+\.\w+$/;
  if (!formData.email.length) {
    setTimeout(() => {
      dispatch(setError(''));
    }, 3000);
    return dispatch(setError('No email entered'));
  }
  if (!regexpEmail.test(formData.email)) {
    setTimeout(() => {
      dispatch(setError(''));
    }, 3000);
    return dispatch(setError('Invalid email'));
  }
  if (!formData.username.length) {
    setTimeout(() => {
      dispatch(setError(''));
    }, 3000);
    return dispatch(setError('No username entered'));
  }
  if (!formData.task.length) {
    setTimeout(() => {
      dispatch(setError(''));
    }, 3000);
    return dispatch(setError('No task entered'));
  }
  if (formData.task.length > 80) {
    setTimeout(() => {
      dispatch(setError(''));
    }, 3000);
    return dispatch(setError('Task name is too long'));
  }
  return 'valid';
};

export default getPages;
