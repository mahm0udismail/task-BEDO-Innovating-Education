import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);  // New state for image preview
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create a preview of the selected image
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPrediction(response.data);
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("There was an error uploading the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center w-100">
        <h1 className="mb-4">Cat and Dog Classifier</h1>

        {imagePreview && (
          <div className="mb-4">
            <img 
              src={imagePreview} 
              alt="Selected" 
              className="img-fluid" 
              style={{ maxHeight: "300px", maxWidth: "100%" }} 
            />
          </div>
        )}

        <div className="mb-4">
          <input
            type="file"
            onChange={handleImageChange}
            className="form-control"
            style={{ maxWidth: "400px" }}
          />
        </div>

        <button
          onClick={handleImageUpload}
          disabled={loading}
          className={`btn btn-primary ${loading ? "disabled" : ""}`}
          style={{ maxWidth: "400px" }}
        >
          {loading ? "Classifying..." : "Upload Image"}
        </button>

        {prediction && (
          <div className="mt-4 text-center">
            <h3 className="text-success">Prediction: {prediction.class}</h3>
            <p className="text-muted">Confidence: {prediction.confidence}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
