import { useState, useEffect } from 'react';
import './App.css'; // Custom CSS for styles

function FileUploader() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    fetch('http://13.61.148.217:3000/api/file-names')
      .then(res => res.json())
      .then(setFiles)
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert('Please select a file first');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://13.61.148.217:3000/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        alert('Upload successful');
        setUploadSuccess(true);
        setUploadedFile(file.name);
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading');
    }
  };

  return (
    <div className="file-uploader">
      <header className="header">
        <h1>Upload and View Files</h1>
      </header>

      <section className="upload-section">
        <input type="file" onChange={handleFileUpload} />
        <button className="cta-btn">Upload File</button>
      </section>

      <section className="file-selection">
        <h2>Select a File from S3</h2>
        <select onChange={(e) => setSelectedFile(e.target.value)}>
          <option value="">Choose a file...</option>
          {files.map((file, idx) => (
            <option key={idx} value={file}>{file}</option>
          ))}
        </select>

        {selectedFile && (
          <div className="file-details">
            <p>Selected: {selectedFile}</p>
            <a href={`https://files--pool.s3.amazonaws.com/${selectedFile}`} target="_blank" rel="noopener noreferrer">
              Open File
            </a>
          </div>
        )}
      </section>

      {uploadSuccess && (
        <div className="success-message">
          <p>🎉 File Uploaded Successfully!</p>
        </div>
      )}

      {uploadedFile && (
        <div className="uploaded-file">
          <p>Uploaded: {uploadedFile}</p>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
