import axios from 'axios';

const baseUrl = 'https://marco-iann-nc-news-api.herokuapp.com/api/';

export const checkUsername = username => {
  return axios.get(baseUrl + 'users/' + username).then(({ data: { user } }) => {
    return user.username;
  });
};

export const getTopics = () => {
  return axios.get(baseUrl + 'topics').then(({ data: { topics } }) => {
    return topics;
  });
};

export const getArticles = params => {
  return axios.get(baseUrl + 'articles', { params }).then(({ data }) => {
    return data;
  });
};

export const getArticleById = id => {
  const articlePromise = axios.get(baseUrl + 'articles/' + id);
  const commentsPromise = axios.get(baseUrl + 'articles/' + id + '/comments');
  return Promise.all([articlePromise, commentsPromise]).then(
    ([
      {
        data: { article }
      },
      {
        data: { comments }
      }
    ]) => {
      return [article, comments];
    }
  );
};
