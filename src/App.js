import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(null); // State for storing the uploaded image
  const [label, setLabel] = useState(""); // State for storing the label text
  const [category, setCategory] = useState(""); // State for storing the selected category
  const [preview, setPreview] = useState(""); // State for image preview
  const [message, setMessage] = useState(""); // Success or error message

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle text label change
  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  // Handle dropdown option change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !label || !category) {
      setMessage(
        "Please select an image, provide a label, and choose a category."
      );
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("label", label);
    formData.append("category", category); // Add category to form data
    formData.append("created_at", new Date()); // Add category to form data

    try {
      const response = await axios.post(
        "http://ec2-54-66-146-109.ap-southeast-2.compute.amazonaws.com:4000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Image uploaded successfully!");
    } catch (error) {
      setMessage("Error uploading image. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Upload Image with Label and Category</h2>
        {preview && <img src={preview} alt="Preview" style={styles.preview} />}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Label:</label>
            <input
              type="text"
              value={label}
              onChange={handleLabelChange}
              placeholder="Enter label text"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>ประเภทการลงทุน:</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              style={styles.input}
            >
              <option value="" disabled>
                เลือกประเภทการลงทุน
              </option>
              <option value="thai_fund">กองทุนไทย </option>
              <option value="thai_stock">หุ้นไทย </option>
              <option value="inter_stock">หุ้นต่างประเทศ</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>
            Upload
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

// Styles for centering and layout
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7", // Light background
  },
  formWrapper: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "300px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    display: "block",
    fontWeight: "500",
  },
  input: {
    padding: "8px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  message: {
    marginTop: "15px",
    fontSize: "14px",
    color: "green",
  },
  preview: {
    width: "100%",
    height: "auto",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
};

export default App;
