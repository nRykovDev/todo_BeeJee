const getPages = (pageNum) => {
  const pages = [];
  for (let i = 1; i <= pageNum; i++) {
    pages.push(String(i));
  }
  const pagesMapped = pages.map((page) => (
    <option className="pageOption pageMenu" key={page} value={page}>
      {page}
    </option>
  ));
  return pagesMapped;
};

export const verifyInput = (formData, dispatch, setError) => {
  // prettier-ignore
  {  const regexpEmail = /^[\w.-]+@[\w.-]+\.\w+$/;
  if (!formData.email.length) return dispatch(setError('No email entered'));
  if (!regexpEmail.test(formData.email)) return dispatch(setError('Invalid email'));
  if (!formData.username.length) return dispatch(setError('No username entered'));
  if (!formData.task.length) return dispatch(setError('No task entered'));
  if (formData.task.length > 80) return dispatch(setError('Task name is too long'));
  
  return 'valid'}
};

export default getPages;
