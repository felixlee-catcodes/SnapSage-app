import axios from 'axios';

const collections = (state = [], action) => {
  if (action.type === 'SET_COLLECTIONS') {
    return action.collections;
  }
  if (action.type === 'CREATE_POST') {
    return [action.post, ...state];
  }
  return state;
};

const setCollections = (collections) => {
  return {
    type: 'SET_COLLECTIONS',
    collections,
  };
};

const addCollection = (post) => {
  return {
    type: 'CREATE_POST',
    post,
  };
};

export const fetchCollections = (username) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/${username}`);
      dispatch(setCollections(response.data.courses));
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const createCollection = (collection, username) => {
  return async (dispatch) => {
    const response = await axios.post(`/api/${username}`, collection);
    dispatch(addCollection(response.data));
  };
};

export default collections;
