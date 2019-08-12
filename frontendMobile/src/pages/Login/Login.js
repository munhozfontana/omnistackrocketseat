import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import styles from './styles';


export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        navigation.navigate('Main', { user });
      }
    });
  }, []);

  async function handleLogin() {
    const response = await api.post('/devs', { username: user });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', { user: _id });
  }

  return (
    <View style={styles.container}>
      <Image source={logo} />
      <TextInput
        value={user}
        onChangeText={setUser}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        textContentType="username"
        placeholderTextColor="#999"
        placeholder="Digite seu usuário do Gihub"
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
