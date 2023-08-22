import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCollectionForm from './CreateCollectionForm';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '../store';

const Collections = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections || []);

  const [userId, setUserId] = useState({});
  const { username } = useParams();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getUser = async (username) => {
      const response = await axios.get(`/api/${username}`);
      console.log('response.data: ', response.data);
      setUserId(response.data.user.id);
    };
    getUser(username);
    dispatch(fetchCollections(username));
  }, []);
  console.log('collections: ', collections);

  //fetch updated data when new collection is created
  useEffect(() => {
    dispatch(fetchCollections(username));
  }, [refresh]);
  return (
    <>
      <h1>
        Your Collections <span>({collections.length})</span>
      </h1>
      <div className="collections">
        <ul>
          {collections.map((collection) => (
            <a
              key={collection.id}
              href={`#/user/${username}/collections/${collection.name}`}
            >
              <li>
                {collection.name}
                <br />
                {collection.id}
              </li>
            </a>
          ))}
        </ul>
      </div>
      <div id="form-container">
        <CreateCollectionForm
          userId={userId}
          username={username}
          triggerRefresh={() => setRefresh(!refresh)}
        />
      </div>
    </>
  );
};

export default Collections;
