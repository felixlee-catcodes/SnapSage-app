import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCollection } from '../store';

const CreateCollectionForm = ({ userId, username, triggerRefresh }) => {
  //eventually i'll get the userId from the auth object
  const [courseName, setCourseName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('username: ', username);
  const submit = async (ev) => {
    ev.preventDefault();
    if (courseName.length) {
      const collection = { name: courseName, userId };
      try {
        await dispatch(createCollection(collection, username));
        triggerRefresh();
      } catch (ex) {
        console.log(ex);
      }

      setCourseName('');
      ev.target.value = '';
    }

    // navigate(`/user/${username}/collections/${courseName}`);
  };
  const onChange = (ev) => {
    setCourseName(ev.target.value);
  };
  return (
    <>
      <h2>Start A New Collection</h2>
      <div id="form">
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="">Course Name:</label>
            <input
              type="text"
              value={courseName}
              onChange={onChange}
              maxLength={30}
            />
          </div>
          <button onClick={submit}>Create</button>
        </form>
      </div>
    </>
  );
};

export default CreateCollectionForm;
