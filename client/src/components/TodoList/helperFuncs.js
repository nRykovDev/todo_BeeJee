const getPages = (pageNum) => {
  const pages = [];
  for (let i = 1; i <= pageNum; i++) {
    pages.push(String(i));
  }
  return pages;
};

export const verifyInput = (formData, setSubmitStatus) => {
  const regexpEmail = /^[\w.-]+@[\w.-]+\.\w+$/;
  if (!regexpEmail.test(formData.email)) {
    setTimeout(() => {
      setSubmitStatus('');
    }, 3000);
    return setSubmitStatus('invalid Email');
  }
  if (!formData.username.length) {
    setTimeout(() => {
      setSubmitStatus('');
    }, 3000);
    return setSubmitStatus('Invalid username');
  }
  if (!formData.task.length) {
    setTimeout(() => {
      setSubmitStatus('');
    }, 3000);
    return setSubmitStatus('Invalid task name');
  }
  return 'valid';
};

export default getPages;
