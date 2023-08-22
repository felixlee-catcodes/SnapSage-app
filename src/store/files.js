import axios from 'axios';

const files = (state = [], action) => {
  if (action.type === 'SET_FILES') {
    return action.files;
  }
  return state;
};

const setFiles = (files) => {
  return {
    type: 'SET_FILES',
    files,
  };
};

export const fetchFiles = (username) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/${username}/files`);
      dispatch(setFiles(response.data));
    } catch (ex) {}
  };
};

export default files;
