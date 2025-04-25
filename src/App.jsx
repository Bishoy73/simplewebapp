import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://51.20.136.139:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Upload successful!');
        setUploadedUrl(data.url);
      } else {
        setMessage(`❌ Upload failed: ${data.error}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setMessage('❌ Error uploading file');
    }
  };

  return (
    <div className="App">
      <h1>Upload File to S3</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
      {uploadedUrl && (
        <p>
          File URL: <a href={uploadedUrl} target="_blank">{uploadedUrl}</a>
        </p>
      )}
    </div>
  );
}

export default App;

