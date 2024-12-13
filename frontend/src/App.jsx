// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [image, setImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleImageUpload = async () => {
//     if (!image) {
//       alert("Please select an image to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", image);

//     setLoading(true);
    
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setPrediction(response.data);
//     } catch (error) {
//       console.error("Error uploading the image:", error);
//       alert("There was an error uploading the image.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Cat and Dog Classifier</h1>
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={handleImageUpload} disabled={loading}>
//         {loading ? "Classifying..." : "Upload Image"}
//       </button>

//       {prediction && (
//         <div>
//           <h3>Prediction: {prediction.class}</h3>
//           <p>Confidence: {prediction.confidence}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;




// import React from "react";
// import ImageUploader from "./Components/ImageUploader";

// function App() {
//   return (
//     <div className="App">
//       <ImageUploader />
//     </div>
//   );
// }

// export default App;


import React from "react";
import ImageUploader from "./Components/ImageUploader";

function App() {
  return (
    <div className="App">
      <ImageUploader />
    </div>
  );
}

export default App;

