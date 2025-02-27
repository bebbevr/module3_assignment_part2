import  { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
      const response = await axios.post("https://module3-assignment-part2-api.onrender.com/predict", {
        text: text,
      });

      setSentiment(response.data.sentiment);
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      setError("Kunde inte analysera sentimentet. Försök igen!");
    }

    setLoading(false);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="text-center mb-4">Sentimentanalys</h1>
      <form className="w-100 p-4 bg-light rounded shadow-lg" onSubmit={handleSubmit}>
        <textarea
          className="form-control mb-3"
          placeholder="Skriv in text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary w-100" type="submit" disabled={loading || !text}>
          {loading ? "Analyserar..." : "Analysera"}
        </button>
      </form>

      {sentiment && (
        <h2 className={`mt-3 text-${sentiment === "positive" ? "success" : sentiment === "negative" ? "danger" : "secondary"}`}>
          Sentiment: {sentiment}
        </h2>
      )}
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}

export default App;
