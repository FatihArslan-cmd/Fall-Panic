import React from "react";
import { formatDate } from "fall-panic/src/pages/ResultPage/components/dateUtils";
import { getDifficultyColor } from "fall-panic/src/pages/ResultPage/components/difficultyUtils";
import { StyleSheet, View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";

const ScoreCard = ({ date, difficulty, score }) => {
  const difficultyColor = getDifficultyColor(difficulty);

  return (
    <Card style={styles.card} elevation={3}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.leftContent}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
          <Chip
            style={[styles.difficultyChip, { backgroundColor: difficultyColor.background }]}
            textStyle={{
              color: difficultyColor.text,
              fontFamily: 'Orbitron-ExtraBold',
            }}
          >
            {difficulty}
          </Chip>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    width: '100%',
    borderRadius: 20,
    opacity: 0.85,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily:'Orbitron-ExtraBold',
  },
  difficultyChip: {
    alignSelf: 'flex-start',
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily:'Orbitron-ExtraBold'
  },
      scoreValue: {
    fontSize: 16,
    fontFamily:'Orbitron-ExtraBold',
    color: 'black',
  },
});

export default ScoreCard;