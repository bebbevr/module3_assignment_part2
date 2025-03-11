import  { useState } from "react";
import axios from "axios"; // HTTP requests

function App() {
  const [text, setText] = useState(""); // save user input
  const [sentiment, setSentiment] = useState(null); // save sentiment answer from API
  const [loading, setLoading] = useState(false); // API loading state
  const [error, setError] = useState(""); // error message

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true); // set loading state
    setError(""); // reset error
    setSentiment(null); // reset sentiment

    // axios.post --> send HTTP post request to the API
    try {
        // const response = await axios.post("https://module3-assignment-part2-api.onrender.com/predict", {
        const response = await axios.post("https://cc-2025-backend-open-cloud-computing-2025.2.rahtiapp.fi/predict", {
            text: text,
        }, { headers: { "Content-Type": "application/json" } });

        console.log("API Response:", response.data); // Logga API-svaret
        setSentiment(response.data.sentiment); // save API sentiment response to state
    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
        setError("Kunde inte analysera sentimentet. Försök igen!");
    }

    setLoading(false); // reset loading state
};

  return (
    <div style={styles.outerContainer}> {/* container centering styles */}
      <div style={styles.container}>
        <h1 style={styles.title}>Sentiment analysis</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            style={styles.textarea}
            placeholder="Write text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button style={styles.button} type="submit" disabled={loading || !text}>
            {loading ? "Analyze..." : "Analyze"}
          </button>
        </form>

        {sentiment && <h2 style={styles.result}>Sentiment: {sentiment}</h2>} {/* show sentiment result */}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "90%",
    width: "500px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "none",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  result: {
    marginTop: "20px",
    fontSize: "20px",
    color: "#28a745",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  "@media (max-width: 600px)": {
    container: {
      width: "90%",
      padding: "15px",
    },
    title: {
      fontSize: "20px",
    },
    textarea: {
      height: "100px",
    },
    button: {
      fontSize: "14px",
      padding: "10px",
    },
    result: {
      fontSize: "18px",
    },
  },
};

export default App;