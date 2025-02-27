import  { useState } from "react";
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
      const response = await axios.post("https://module3-assignment-part2-api.onrender.com", {
        text: text,
      });

      setSentiment(response.data.sentiment);
    } catch (err) {
      console.error("Error:", err); // Logga felet i konsolen
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

// CSS-stilar som inline-stil
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
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
    height: "100px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
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
};

export default App;
