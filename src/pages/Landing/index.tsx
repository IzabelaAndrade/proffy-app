import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';

const Landing: React.FC = () => {
  const navigation = useNavigation();
  const [totalConections, setTotalConections] = useState(0);


  useEffect(() => {
    api.get('connections').then( response => setTotalConections(response.data.total)
    )
  }, [])

  const handleNavigateToGiveClassPage = useCallback(() => {
    navigation.navigate('GiveClasses')
  }, [])

  const handleNavigateToStudy = useCallback(() => {
    navigation.navigate('Study')
  }, [])

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner}></Image>
      <Text style={styles.title}>Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.containerButton}>
        <RectButton style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudy}
        >
          <Image source={studyIcon}></Image>
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton style={[styles.button, styles.buttonSecundary]}
          onPress={handleNavigateToGiveClassPage}
        >
          <Image source={giveClassesIcon}></Image>
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>Total de {totalConections} conexões já realizadas {' '}
        <Image source={heartIcon}></Image>
      </Text>
    </View>
  )
}

export default Landing;