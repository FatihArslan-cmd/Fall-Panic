import { useEffect, useState } from "react";
import { storage } from "../../../../../../src/utils/storage";

const useGameResults = () => {
  const [gameResults, setGameResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          } catch {
            existingResults = [];
          }
        }

        const scoresWithDates = existingResults.map(item => ({
          ...item,
          date: new Date(item.date)
        }));

        setGameResults(scoresWithDates);
      } catch {
        setGameResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  return { gameResults, isLoading };
};

export { useGameResults };
