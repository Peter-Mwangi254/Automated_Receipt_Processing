import React, { useState } from 'react';
import { getSignedUrl } from '../api';

const UploadDashboard = () => {
  const [file, setFile] = useState(null);
  const [log, setLog] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      const { url } = await getSignedUrl(file);

      const uploadRes = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (uploadRes.ok) {
        setLog((prev) => [...prev, { name: file.name, time: new Date().toLocaleTimeString() }]);
        alert('Upload successful!');
      } else {
        alert('Upload failed!');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg space-y-4">
      <h1 className="text-xl font-bold">Upload Receipt</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full mb-4" />

      {preview && <img src={preview} alt="Preview" className="h-40 object-contain mx-auto" />}

      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Upload to S3
      </button>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Upload Log:</h2>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {log.map((item, i) => (
            <li key={i}>{item.name} - {item.time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadDashboard;
