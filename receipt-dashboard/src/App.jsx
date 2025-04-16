import React, { useState } from 'react';

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadLogs, setUploadLogs] = useState([]);

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    setSelectedFiles(validFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleUpload = () => {
    selectedFiles.forEach((file) => {
      setUploadLogs((prev) => [...prev, { name: file.name, time: new Date().toLocaleString() }]);
    });
    setSelectedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">📤 Receipt Upload Dashboard</h1>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full max-w-xl p-10 border-4 border-dashed border-blue-400 bg-white rounded-xl text-center mb-6"
      >
        <p className="text-gray-600">Drag and drop receipt images here</p>
        <p className="text-gray-500 mt-2">or</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mt-3"
        />
      </div>

      {selectedFiles.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">📎 Selected Receipts</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg shadow">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-sm mt-2">{file.name}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </>
      )}

      {uploadLogs.length > 0 && (
        <div className="mt-10 w-full max-w-xl bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">📋 Upload Log</h2>
          <ul className="space-y-2">
            {uploadLogs.map((log, idx) => (
              <li key={idx} className="flex justify-between text-sm text-gray-700">
                <span>{log.name}</span>
                <span className="text-gray-500">{log.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
