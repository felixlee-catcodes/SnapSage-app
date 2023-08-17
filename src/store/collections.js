import axios from 'axios';

const collections = (state = [], action) => {
  if (action.type === 'SET_COLLECTIONS') {
    return action.collections;
  }
  return state;
};

const setCollections = (collections) => {
  return {
    type: 'SET_COLLECTIONS',
    collections,
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

export default collections;
