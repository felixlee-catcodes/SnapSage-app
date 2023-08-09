import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateCollectionForm = ({ userId, username }) => {
  //eventually i'll get the userId from the auth object
  //   const [userId, setUserId] = useState('');
  const [courseName, setCourseName] = useState('');
  const navigate = useNavigate();
  const submit = async (ev) => {
    ev.preventDefault();
    try {
      const request = await axios.post(`/api/${username}`, {
        name: courseName,
        userId,
      });
    } catch (ex) {
      console.log(ex);
    }
    setCourseName('');
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
            <input type="text" onChange={onChange} maxLength={30} />
          </div>
          <button onClick={submit}>Create</button>
        </form>
      </div>
    </>
  );
};

export default CreateCollectionForm;
