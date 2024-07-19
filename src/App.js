import { useState, useEffect } from "react";

export default function App() {
  const [hadith, setHadith] = useState(null); // State to store the Hadith object
  const apiUrl =
    "https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$HX3QlmNWekyBauQ4rTyuE4g4UzcjgDsMOdtKZbc8gygpjhYvDi";

  async function getHadith() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error fetching Hadith: ${response.statusText}`);
      }
      const data = await response.json();

      const randomIndex =
        Math.floor(Math.random() * data.hadiths.data.length) + 1;
      const randomHadith = data.hadiths.data[randomIndex];

      setHadith(randomHadith);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getHadith(); // Fetch and display a random Hadith on component mount
  }, []);

  return (
    <div className="App">
      <h1 className="bismillah">&#xFDFD;</h1> {/* Bismillah in Arabic */}
      <h5 className=""> As salamu alai Kum Ayesha</h5>
      <button onClick={getHadith} className="get-hadith-button">
        Get a Hadith!
      </button>
      {hadith && (
        <div className="hadith-details">
          <p>Hadith: {hadith.hadithEnglish}</p>
          <p>Book: {hadith.book.bookName}</p>
          <p>Hadith Number: {hadith.hadithNumber}</p>
          <p>Status: {hadith.status}</p>
        </div>
      )}
    </div>
  );
}
