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
