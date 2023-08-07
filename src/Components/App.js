import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get('/api/felix');
        setUser(response.data);
      } catch (ex) {
        console.log(ex);
      }
    };
    loadUser();
  }, []);
  console.log('user', user);
  console.log('user course(s)', user.courses);
  console.log(typeof user.courses);

  const { id, username, password } = user;
  return (
    <>
      <h1>SnapSage App</h1>
      <hr />
      <h2>User Info</h2>
      <ul>
        <li>{id}</li>
        <li>{username}</li>
        <li>{password}</li>
        {user && user.courses && user.courses[0].name ? (
          <li>{user.courses[0].name}</li>
        ) : null}
      </ul>
    </>
  );
};

export default App;
