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
  return axios.get(baseUrl + 'articles', params).then(({ data }) => {
    return data;
  });
};

export const getArticleById = article_id => {
  const articlePromise = axios.get(baseUrl + 'articles/' + article_id);
  const commentsPromise = axios.get(
    baseUrl + 'articles/' + article_id + '/comments'
  );
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

export const postComment = ({ article_id, username, body }) => {
  return axios
    .post(baseUrl + 'articles/' + article_id + '/comments', { username, body })
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const postArticle = newArticle => {
  return axios
    .post(baseUrl + 'articles', newArticle)
    .then(({ data: { article } }) => {
      return article;
    });
};
