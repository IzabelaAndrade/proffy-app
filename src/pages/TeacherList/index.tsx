import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        })

        setFavorites(favoritedTeachersId);
      }
    })
  }


  async function searchTeacher() {

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time
      }
    });
    setTeachers(response.data);
    setFilterVisible(false);
    loadFavorites();

  }

  function handleToggleFiltersVisible() {
    setFilterVisible(!filterVisible);
  }
  return (
    <View style={styles.container}>
      <PageHeader title='Proffys disponíveis'
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <AntDesign name="filter" size={24} color="#fff" />
          </BorderlessButton>
        )}
      >
        {filterVisible &&
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder='Qual a maéria?'
              placeholderTextColor='#c1bccc'
              value={subject}
              onChangeText={(text) => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semaa</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Qual o dia?'
                  placeholderTextColor='#c1bccc'
                  value={weekDay}
                  onChangeText={(text) => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Qual o horário?'
                  placeholderTextColor='#c1bccc'
                  value={time}
                  onChangeText={(text) => setTime(text)}
                />
              </View>
            </View>
            <RectButton style={styles.submitButton} onPress={searchTeacher}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>}

      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          marginBottom: 24
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem key={teacher.id} teacher={teacher} 
            favorite={favorites.includes(teacher.id)} />
          )
          })
        }

      </ScrollView>
    </View>
  )
}

export default TeacherList;