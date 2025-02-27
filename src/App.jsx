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
    <div style={styles.outerContainer}>
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


/** import { useState } from "react";
import axios from "axios"; // HTTP requests

function App() {
  const [text, setText] = useState(""); // save text that user writes
  const [sentiment, setSentiment] = useState(null); // save result from sentimental analysis
  const [loading, setLoading] = useState(false); // is API request loading
  const [error, setError] = useState(""); // error message


  const handleSubmit = async (e) => { 
    e.preventDefault(); // prevents the page from reloading when submitting the form
    setLoading(true); // API call loading
    setError(""); // clear previous errors 
    setSentiment(null); // clear previous sentiment result

    // send text to API
    try {
      const response = await axios.post( // HTTP POST request to API with text
        "https://module3-assignment-part2-api.onrender.com",
        { text: text }
      );

      setSentiment(response.data.sentiment); // save API response to sentiment state
    } catch (err) {
      console.error("Error:", err);
      setError("Kunde inte analysera sentimentet. Försök igen!");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sentimental analysis</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          style={styles.textarea}
          placeholder="Write text..."
          value={text}
          onChange={(e) => setText(e.target.value)} // update text state
        />
        <button style={styles.button} type="submit" disabled={loading || !text}>
          {loading ? "Analyzes..." : "Analyze"}
        </button>
      </form>

      {sentiment && <h2 style={styles.result}>Sentiment: {sentiment}</h2>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    maxWidth: "90%",
    width: "500px",
    margin: "0 auto",
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

**/