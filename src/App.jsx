import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSentiment(null);

    try {
      const response = await axios.post(
        "https://module3-assignment-part2-api.onrender.com",
        { text: text }
      );

      setSentiment(response.data.sentiment);
    } catch (err) {
      console.error("Error:", err);
      setError("Kunde inte analysera sentimentet. Försök igen!");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sentimentanalys</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          style={styles.textarea}
          placeholder="Skriv in text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button style={styles.button} type="submit" disabled={loading || !text}>
          {loading ? "Analyserar..." : "Analysera"}
        </button>
      </form>

      {sentiment && <h2 style={styles.result}>Sentiment: {sentiment}</h2>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "90%",
    width: "500px",
    margin: "50px auto",
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
      margin: "30px auto",
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
