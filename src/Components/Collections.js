import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCollectionForm from './CreateCollectionForm';
import { useParams } from 'react-router-dom';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [user, setUser] = useState({});
  const { username } = useParams();
  useEffect(() => {
    const getUser = async (username) => {
      const response = await axios.get(`/api/${username}`);
      setUser(response.data);
      setCollections(response.data.courses);
    };

    getUser('felix');
  }, []);

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
              <li>{collection.name}</li>
            </a>
          ))}
        </ul>
      </div>
      <div id="form-container">
        <CreateCollectionForm userId={user.id} username={username} />
      </div>
    </>
  );
};

export default Collections;
