// App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Importing CSS for styling

const App = () => {
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callApi = () => {
    setLoading(true);
    setError("");

    // Replace this URL with the actual API you want to call
    axios
      .get("http://localhost:4000/get-ocr")
      .then((response) => {
        setApiResponse(JSON.stringify(response.data, null, 2));
      })
      .catch((err) => {
        setError("Error fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="app-container">
      <h1>Simple API Caller test</h1>
      <button onClick={callApi} disabled={loading} className="btn">
        {loading ? "Loading..." : "Call API"}
      </button>
      <div className="result-container">
        {error && <p className="error">{error}</p>}
        {apiResponse && <pre className="result">{apiResponse}</pre>}
      </div>
    </div>
  );
};

export default App;
