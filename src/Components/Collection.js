import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddFilesForm from './AddFilesForm';
import { fetchCollections } from '../store';
import { fetchFiles } from '../store';
import { useDispatch, useSelector } from 'react-redux';

//need to get & display the list of files in the specific collection
const Collection = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections || []);
  const files = useSelector((state) => state.files || []);

  const [collectionId, setCollectionId] = useState('');

  const { username, collection } = useParams();

  useEffect(() => {
    dispatch(fetchFiles(username));
    dispatch(fetchCollections(username));
  }, [collection]);

  useEffect(() => {
    if (collections && collections.length > 0) {
      const targetCollection = collections.find(
        (col) => col.name === collection
      );

      if (targetCollection) {
        setCollectionId(targetCollection.id);
      }
    }
  }, [collection, collections]);

  return (
    <>
      <h1>Collection: {collection}</h1>
      <ul>
        {files
          ?.filter((file) => file.course.name === collection)
          .map((file) => (
            <li key={file.id}>
              <h3>{file.description}</h3>
              <img src={file.mediaUrl} alt={file.description} />
            </li>
          ))}
      </ul>
      <AddFilesForm courseId={collectionId} username={username} />
    </>
  );
};

export default Collection;
