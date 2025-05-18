import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title } from "react-native-paper";

const SettingItem = ({ icon, title, children, contentLayout = 'side-by-side' }) => {
  const cardContentStyle = [
    styles.cardContentBase,
    contentLayout === 'side-by-side' ? styles.cardContentSideBySide : styles.cardContentStacked
  ];

  const rightContentStyle = [
     styles.rightContentBase,
     contentLayout === 'side-by-side' ? styles.rightContentSideBySide : styles.rightContentStacked
  ];

  return (
    <Card style={styles.card}>
      <Card.Content style={cardContentStyle}>
        <View style={[
            styles.leftContent,
            contentLayout === 'stacked' && styles.leftContentStacked
          ]}
        >
          <Icon name={icon} size={24} color="#D73901" style={styles.icon} />
          <Title style={styles.title}>{title}</Title>
        </View>
        <View style={rightContentStyle}>
          {children}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    elevation: 0,
    borderRadius: 8,
  },
  cardContentBase: {
    padding: 16,
  },
  cardContentSideBySide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContentStacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContentStacked: {
    marginBottom: 8,
  },
  rightContentBase: {
  },
  rightContentSideBySide: {
    minWidth: 50,
    alignItems: 'flex-end',
  },
  rightContentStacked: {
    alignItems: 'stretch',
    marginTop: 8,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontFamily:'Orbitron-ExtraBold',
    margin: 0,
  },
});

export default SettingItem;