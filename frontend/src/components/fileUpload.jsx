import React, { useState } from "react";
import axios from "axios";

function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:8000/upload", formData);
      onUpload(res.data);
    } catch (err) {
      setError("Failed to upload file");
    }
  };

  return (
    <div className="file-upload-container">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default FileUpload;
