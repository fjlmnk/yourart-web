import React from "react";

function UploadForm({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <div className="upload-form">
      <label className="upload-btn">
        Завантажити картину
        <input type="file" accept="image/*" onChange={handleChange} hidden />
      </label>
    </div>
  );
}

export default UploadForm;
