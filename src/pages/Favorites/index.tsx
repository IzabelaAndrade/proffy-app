import React, { useEffect, useState } from 'react';
import {View, ScrollView} from 'react-native';
import PageHeader from '../../components/PageHeader';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);


  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  )
  return(
    <View style={styles.container}>
      <PageHeader title='Proffys favoritos'></PageHeader>
      <ScrollView 
        style={styles.teacherList}
          contentContainerStyle={{
            paddingHorizontal: 16,
            marginBottom: 24
          }}
        >
          {favorites.map((teacher: Teacher) => {
            return <TeacherItem key={teacher.id} teacher={teacher} favorite/>
          })}
        {/* <TeacherItem />
        <TeacherItem />
        <TeacherItem /> */}
      </ScrollView>
    </View>
  )
}

export default Favorites;