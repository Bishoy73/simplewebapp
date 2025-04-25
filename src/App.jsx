import React, { useState, useEffect } from 'react';

function FileUploader() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  // جلب الملفات من الـ S3
  useEffect(() => {
    fetch('http://13.48.133.223:3000/api/file-names') 
      .then(response => response.json())
      .then(data => {
        setFiles(data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);

  // التعامل مع رفع الملف
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://51.20.136.139:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        setUploadedFile(file.name);
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
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

      {/* عرض الملف الذي تم رفعه */}
      {uploadedFile && (
        <div>
          <p>Uploaded File: {uploadedFile}</p>
        </div>
      )}
    </div>
  );
}

export default FileUploader;

