import CustomModal from "../../../../../../src/components/CustomModal";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import { COLORS } from "../constants/colors";
import { styles } from "../styles/MenuStyle";

const QuitButton = () => {
  const quitColor = COLORS.danger || '#E53935';
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();

  const handleShowQuitModal = () => {
    setIsModalVisible(true);
  };

  const hideQuitModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirmQuitGame = () => {
    hideQuitModal();
    navigation.goBack();
  };

  return (
    <>
      <Button
        mode="outlined"
        onPress={handleShowQuitModal}
        style={[
          styles.button,
          {
            borderColor: quitColor,
            borderWidth: 2,
            marginTop: 15,
          }
        ]}
        labelStyle={[
          styles.buttonTextOutlined,
          { color: quitColor }
        ]}
      >
        Quit Game
      </Button>

      <CustomModal
        visible={isModalVisible}
        onDismiss={hideQuitModal}
        onConfirm={handleConfirmQuitGame}
        title={t('quitConfirmationModal.title', { defaultValue: 'Quit Game?' })}
        text={t('quitConfirmationModal.text', { defaultValue: 'Are you sure you want to quit the current game?' })}
        showConfirmButton={true}
        confirmText={t('quitConfirmationModal.confirm', { defaultValue: 'Yes, Quit' })}
      />
    </>
  );
};

export default QuitButton;