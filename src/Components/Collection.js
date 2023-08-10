import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddFilesForm from './AddFilesForm';

//need to get & display the list of files in the specific collection
const Collection = () => {
  const [files, setFiles] = useState([]);
  const [collectionId, setCollectionId] = useState('');

  const { username, collection } = useParams();

  useEffect(() => {
    const getFiles = async () => {
      const response = await axios.get(`/api/${username}/files`);
      setFiles(response.data);
    };
    const getCollection = async () => {
      const response = await axios.get(`/api/${username}`);
      const collections = response.data.courses;
      const currentColl = collections.filter(
        (col) => col.name === collection
      )[0].id;
      setCollectionId(currentColl);
    };
    getFiles();
    getCollection();
  }, []);
  //   console.log('collection id: ', collectionId);
  //   console.log('1st file course name:', files[0]?.course.name);
  //   console.log('all files: ', files);
  //   const mapped = files.map((file) => file.course.name);
  //   console.log('file map: ', mapped);
  //   const filtered = files.filter((file) => file.course.name === collection);
  //   console.log('filter: ', filtered);
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
