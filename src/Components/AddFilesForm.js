import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddFilesForm = ({ courseId, username }) => {
  const [mediaUrls, setMedialUrls] = useState([]);
  const [input, setInput] = useState(null);

  useEffect(() => {
    if (input) {
      input.addEventListener('change', (ev) => {
        const files = ev.target.files;
        const newMediaUrls = [...mediaUrls];

        //loop thru selected files
        for (const file of files) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener('load', () => {
            newMediaUrls.push(reader.result);
            setMedialUrls(newMediaUrls);
          });
        }
      });
    }
  }, [input]);

  const submit = async (ev) => {
    ev.preventDefault();
    for (const mediaUrl of mediaUrls) {
      await axios.post(`/api/${username}/file`, { mediaUrl, courseId });
    }
    setMedialUrls([]);
  };

  return (
    <>
      <form onSubmit={submit} action="post">
        <input
          type="file"
          accept="image/*, application/pdf"
          ref={(el) => {
            setInput(el);
          }}
          multiple
        />
        <button>Add Files</button>
      </form>
      <div id="img-preview">
        {mediaUrls &&
          mediaUrls.map((url, idx) => {
            <img
              src={url}
              alt={idx}
              key={idx}
              style={{
                maxHeight: 150,
                maxWidth: 'auto',
                alignSelf: 'center',
                marginBottom: '20',
              }}
            />;
          })}
      </div>
    </>
  );
};

export default AddFilesForm;
