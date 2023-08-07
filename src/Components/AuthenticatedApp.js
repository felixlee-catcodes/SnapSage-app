import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Collections from './Collections';
import Collection from './Collection';

const AuthenticatedApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:username/collections" element={<Collections />} />
        <Route
          path="/user/:username/collections/:collection"
          element={<Collection />}
        />
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
