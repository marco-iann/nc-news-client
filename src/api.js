import axios from 'axios';

const baseUrl = 'https://marco-iann-nc-news-api.herokuapp.com/api/';

export const checkUsername = username => {
  return axios.get(baseUrl + 'users/' + username).then(({ data: { user } }) => {
    return user;
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
  return axios.get(baseUrl + 'articles/' + id).then(({ data: { article } }) => {
    return article;
  });
};

export const getCommentsByArticleId = id => {
  return axios
    .get(baseUrl + 'articles/' + id + '/comments')
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const postComment = ({ id, username, body }) => {
  return axios
    .post(baseUrl + 'articles/' + id + '/comments', { username, body })
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

export const addUser = user => {
  return axios.post(baseUrl + 'users', user).then(({ data: { user } }) => {
    return user;
  });
};

export const deleteArticle = id => {
  return axios.delete(baseUrl + 'articles/' + id);
};

export const deleteComment = id => {
  return axios.delete(baseUrl + 'comments/' + id);
};

export const patchArticle = (id, direction) => {
  return axios
    .patch(baseUrl + 'articles/' + id, { inc_votes: direction })
    .then(({ data: { article } }) => {
      return article;
    });
};

export const patchComment = (id, direction) => {
  return axios
    .patch(baseUrl + 'comments/' + id, { inc_votes: direction })
    .then(({ data: { comment } }) => {
      return comment;
    });
};
