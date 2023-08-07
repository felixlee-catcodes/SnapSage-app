import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [user, setUser] = useState({});
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
      <h1>Your Collections</h1>
      <ul>
        {collections.map((collection) => (
          <li>{collection.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Collections;
