import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileUploader() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  // جلب الملفات من الـ S3
  useEffect(() => {
    axios.get('http://51.20.136.139:3000/api/files')
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);

  // التعامل مع رفع الملف
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://51.20.136.139:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  // التعامل مع اختيار الملف من قائمة S3
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.value);
  };

  return (
    <div>
      <h1>Upload and Select Files</h1>

      {/* حقل تحميل الملفات من الكمبيوتر */}
      <input type="file" onChange={handleFileUpload} />
      <br />

      {/* حقل اختيار الملفات من S3 */}
      <select onChange={handleFileSelect}>
        <option value="">Select a file from S3</option>
        {files.map((file, index) => (
          <option key={index} value={file}>
            {file}
          </option>
        ))}
      </select>

      {/* عرض الملف الذي تم اختياره */}
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile}</p>
          <a href={`https://files--pool.s3.amazonaws.com/${selectedFile}`} target="_blank" rel="noopener noreferrer">
            Open File
          </a>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
