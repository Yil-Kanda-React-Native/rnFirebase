import React, {useEffect, useState} from 'react';
import {Text, View, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = infoUser => {
    setUser(infoUser);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  if (initializing) {
    return null;
  }

  const createUser = (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Usuario creado');
      });
  };

  const createDBUser = () => {
    firestore()
      .collection('Users')
      .add({
        name: 'Juan Pérez',
        age: 30,
        curp: 'XXXX010101HCOXXX01',
      })
      .then(() => {
        Alert.alert('User added!');
      });
  };

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <Button
          title={'Login'}
          onPress={() => createUser('juanperez@gmail.com', 'password')}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Hello, {user.email}!</Text>
      <Button title={'Agregar usuario'} onPress={createDBUser} />
    </View>
  );
};

export default App;
