import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';

const AddFilesForm = ({ courseId, username }) => {
  const [mediaUrls, setMedialUrls] = useState([]);
  const [input, setInput] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  //const [newRecords, setNewRecords] = useState([]);

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
            newMediaUrls.push({ mediaUrl: reader.result, description: '' });
            setMedialUrls(newMediaUrls);
          });
        }
      });
    }
  }, [input]);

  const submit = async (ev) => {
    ev.preventDefault();
    for (const record of mediaUrls) {
      console.log(record);
      const { mediaUrl, description } = record;
      await axios.post(`/api/${username}/file`, {
        mediaUrl,
        description,
        courseId,
      });
    }
    setMedialUrls([]);
    setModalOpen(false);
  };

  console.log(mediaUrls);

  return (
    <>
      <form
        onSubmit={() => {
          setModalOpen(true);
        }}
      >
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
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={{ padding: '20px', backgroundColor: 'whitesmoke' }}>
          <h1>Testing Modal</h1>
          <form onSubmit={submit} action="post">
            {mediaUrls.map((record, idx) => (
              <div key={idx}>
                <img src={record.mediaUrl} alt={idx} />
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  placeholder="description here"
                  value={record.description}
                  onChange={(ev) => {
                    const newMediaUrls = [...mediaUrls];
                    newMediaUrls[idx].description = ev.target.value;
                    setMedialUrls(newMediaUrls);
                  }}
                />
              </div>
            ))}
            <button>Save & Upload</button>
          </form>
        </div>
      </Modal>
      {/* <div id="img-preview">
        {mediaUrls.map((url, idx) => (
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
          />
        ))}
      </div> */}
    </>
  );
};

export default AddFilesForm;
