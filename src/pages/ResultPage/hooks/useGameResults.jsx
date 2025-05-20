import { useEffect, useState } from "react";
import { storage } from "../../../../../../src/utils/storage";

const useGameResults = () => {
  const [gameResults, setGameResults] = useState([]);

  useEffect(() => {
    const fetchScores = () => {
      try {
        const existingResultsString = storage.getString('gameResults');
        let existingResults = [];

        if (existingResultsString) {
          try {
            existingResults = JSON.parse(existingResultsString);
            if (!Array.isArray(existingResults)) {
                 existingResults = [];
            }
          } catch (parseError) {
             existingResults = [];
          }
        }

        const scoresWithDates = existingResults.map(item => ({
            ...item,
            date: new Date(item.date)
        }));

        setGameResults(scoresWithDates);

      } catch (error) {
        setGameResults([]);
      }
    };

    fetchScores();
  }, []);

  return gameResults;
};

// Change from export default to named export
export { useGameResults };