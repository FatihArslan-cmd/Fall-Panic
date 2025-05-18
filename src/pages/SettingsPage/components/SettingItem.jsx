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

  const leftContentStyle = [
      styles.leftContent,
      contentLayout === 'stacked' && styles.leftContentStacked,
  ];

  const rightContentFinalStyle = [
    rightContentStyle,
    contentLayout === 'side-by-side' && { flex: 1 },
  ];


  return (
    <Card style={styles.card}>
      <Card.Content style={cardContentStyle}>
        <View style={leftContentStyle}>
          <Icon name={icon} size={24} color="#D73901" style={styles.icon} />
          <Title style={styles.title}>{title}</Title>
        </View>

        {contentLayout === 'side-by-side' && <View style={styles.spacer} />}

        <View style={rightContentFinalStyle}>
          {children}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    opacity: 0.85,
    elevation: 0,
    borderRadius: 8,
  },
  cardContentBase: {
    padding: 16,
  },
  cardContentSideBySide: {
    flexDirection: 'row',
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
  spacer: {
    width: '30%',
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