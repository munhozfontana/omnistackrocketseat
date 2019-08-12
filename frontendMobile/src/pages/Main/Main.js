import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  Image, SafeAreaView, Text, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dislike from '../../assets/dislike.png';
import like from '../../assets/like.png';
import logo from '../../assets/logo.png';
import itsamatch from '../../assets/itsamatch.png';
import api from '../../services/api';
import styles from './styles';

export default function Main({ navigation }) {
  const id = navigation.getParam('user');
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const reponse = await api.get('/devs', {
        headers: { user: id },
      });
      setUsers(reponse.data);
    }
    loadUser();
  }, [id]);

  useEffect(() => {
    const socket = io('http://192.168.1.7:3333', {
      query: { user: id },
    });

    socket.on('match', (dev) => {
      setMatchDev(dev);
    });
  }, [id]);

  async function handleLikes() {
    const [user, ...rest] = users;

    await api.post(`devs/${user._id}/likes`, null, {
      headers: { user: id },
    });

    setUsers(rest);
  }

  async function handleDislikes() {
    const [user, ...rest] = users;

    await api.post(`devs/${user._id}/dislikes`, null, {
      headers: { user: id },
    });

    setUsers(rest);
  }

  async function handlerLogout() {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  }


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handlerLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        {users.length === 0
          ? <Text style={styles.empty}>Acabou :c</Text>
          : (
            users.map((user, index) => (

              <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                <Image style={styles.avatar} source={{ uri: user.avatar }} />
                <View style={styles.footer}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text
                    style={styles.bio}
                    numberOfLines={3}
                  >
                    {user.bio}
                  </Text>
                </View>
              </View>
            ))
          )}
      </View>
      {users.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleLikes} style={styles.button}>
            <Image source={like} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDislikes} style={styles.button}>
            <Image source={dislike} />
          </TouchableOpacity>
        </View>
      )}
      {matchDev && (
        <View style={styles.matchContainer}>
          <Image style={styles.matchImage} source={itsamatch} />
          <Image style={styles.matchAvatar} source={{ uri: matchDev.avatar }} />
          <Text style={styles.matchName}>{matchDev.name}</Text>
          <Text style={styles.matchBio}>{matchDev.bio}</Text>
          <TouchableOpacity onPress={() => setMatchDev(null)}>
            <Text style={styles.closeMatch}>FECHAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
