const getPages = (pageNum) => {
  const pages = [];
  for (let i = 1; i <= pageNum; i++) {
    pages.push(String(i));
  }
  return pages;
};

export default getPages;
