import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  // Fetch files list from the backend (EC2)
  useEffect(() => {
    fetch('http://51.20.136.139:3000/api/files') // Replace with your EC2 IP
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  // Fetch the URL of the selected file
  const handleFileSelection = (fileName) => {
    fetch(`http://51.20.136.139:3000/api/file-url?fileName=${fileName}`)
      .then((res) => res.json())
      .then((data) => setFileUrl(data.fileUrl))
      .catch((error) => console.error('Error fetching file URL:', error));
  };

  return (
    <div className="App">
      <h1>Vite + React</h1>

      {/* Dropdown to select a file */}
      <div>
        <label htmlFor="fileSelect">Select a file: </label>
        <select
          id="fileSelect"
          value={selectedFile}
          onChange={(e) => {
            const fileName = e.target.value;
            setSelectedFile(fileName);
            handleFileSelection(fileName);
          }}
        >
          <option value="">--Select a file--</option>
          {files.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>
      </div>

      {/* Display the selected file URL */}
      {fileUrl && (
        <div>
          <h3>File URL:</h3>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
