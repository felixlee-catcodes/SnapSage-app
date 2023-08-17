import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddFilesForm from './AddFilesForm';
import { fetchCollections } from '../store';
import { useDispatch, useSelector } from 'react-redux';

//need to get & display the list of files in the specific collection
const Collection = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections || []);
  const [files, setFiles] = useState([]);
  const [collectionId, setCollectionId] = useState('');

  const { username, collection } = useParams();

  useEffect(() => {
    //gets all the files associated to a user
    const getFiles = async () => {
      const response = await axios.get(`/api/${username}/files`);
      //set files in state, to be moved to redux store
      setFiles(response.data);
    };
    getFiles();
    //fecth a user's collections
    dispatch(fetchCollections(username));
  }, []);
  console.log('collection after 1st UFX: ', collections); //expected result: an array with 3 objects as its elements
  useEffect(() => {
    if (collections && collections.length > 0) {
      const targetCollection = collections.find(
        (col) => col.name === collection
      );

      console.log(targetCollection); //coming back undefined
      if (targetCollection) {
        setCollectionId(targetCollection.id);
      }
    }
  }, [collection]);
  console.log('collections: ', collections[0]?.name === collection); //returns true! so it's not a character-based error...
  console.log('col id test 1: ', collectionId);
  //console.log('url param: ', collection, ' data source: ', collections[0].name);
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
