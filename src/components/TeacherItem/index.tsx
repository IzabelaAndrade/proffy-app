import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { View, Image, Text, Linking } from 'react-native';

import heartOultlineIcon from '../../assets/images/icons/heart-outline.png';
import noFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string
  cost: number
  name: string
  subject: string
  user_id: number
  whatsapp: string
}


interface TeacherItemProps {
  teacher: Teacher,
  favorite: boolean,
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorite}) => {
  const [isFavorited, setIsFavorited] = useState(favorite);

  function handleLinkToWhatsapp() {
    api.post('connections',{
      user_id: teacher.user_id
    })
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray =  JSON.parse(favorites);
    }
    if (favorite) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });

      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorited(false);
    }else {
      favoritesArray.push(teacher);
      setIsFavorited(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        ></Image>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}> Preço/hora {'   '}
          <Text style={styles.priceValue}>RS {teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          >
            { isFavorited
              ?  <Image source={heartOultlineIcon}></Image>
              : <Image source={noFavoriteIcon}></Image>
            }
          </RectButton>
          <RectButton style={styles.ContactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon}></Image>
            <Text style={styles.contactButtonText}>Contato</Text>
          </RectButton>
        </View>
      </View>

    </View>
  )
};

export default TeacherItem;