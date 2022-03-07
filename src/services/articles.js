const URL = process.env.REACT_APP_API_URL_BASE;

const getAllArticles = (pageIndex, { author, title, _tags }) => {
  let tagsQuery = '';
  if (_tags) {
    _tags.forEach((tag) => {
      tagsQuery += `&_tags[]=${tag}`;
    });
  }
  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${URL}/api/articles?pageIndex=${pageIndex}&author=${author}&title=${title}${tagsQuery}`, payload);
};

const deleteArticle = (id) => {
  const payload = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${URL}/api/articles/${id}`, payload);
};

const articlesService = {
  getAllArticles,
  deleteArticle,
};

export default articlesService;
