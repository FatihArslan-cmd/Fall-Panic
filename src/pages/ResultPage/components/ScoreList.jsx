import React from "react";
import ScoreCard from "fall-panic/src/pages/ResultPage/components/ScoreCard";
import { FlatList, StyleSheet } from "react-native";
import { AnimatedSection } from "../../../../../../src/components/Animations/EnteringPageAnimation";

const ScoreList = ({ scores }) => {
  return (
    <FlatList
      data={scores}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <AnimatedSection key={index.toString()} index={index}> 
          <ScoreCard
            date={item.date}
            difficulty={item.difficulty}
            score={item.score}
          />
        </AnimatedSection>
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    width: '100%',
  },
});

export default ScoreList;