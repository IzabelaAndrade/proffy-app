import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import backgroundImage from '../../assets/images/give-classes-background.png'


import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const GiveClasses: React.FC = () => {
  const {goBack} = useNavigation();

  function handleGoBack() {
    goBack();
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={backgroundImage}
        style={styles.contant}>

        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>para começar você precisa se cadastrar como professor na nossa plataforma web</Text>

      </ImageBackground>
      <RectButton style={styles.okButton} onPress={handleGoBack}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses;