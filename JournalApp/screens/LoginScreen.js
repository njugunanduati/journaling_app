import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const toaster = useToast();

    const handleToast = (message, type) => {
        toaster.show({ message: message, type: type, position: 'top' });
    };

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            navigation.navigate('Home');
        }else{
            navigation.navigate('Login');
        }
    }, []);


  const handleLogin = () => {
    if (email == '' || password ==''){
        const message = 'Please fill all fields';
        const the_type = 'warning';
        handleToast(message, the_type);
        return;
    }
    setLoading(true);
    axios.post('http://localhost:4050/api/login', { email, password })
      .then(response => {
        // Save token and navigate to Home
        // save the access_token to the local storage
        localStorage.setItem('access_token', response.data.access_token);
        const message = 'Welcome back';
        const the_type = 'success';
        handleToast(message, the_type);
        setLoading(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        setLoading(false)
        toaster.show({ message: error, type: 'danger' });
        console.log(error)
    });
  };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

  return (
    (loading == false)? (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Title style={styles.title}>Login</Title>
            <TextInput
                label="Email Address"
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                style={styles.input_email}
            />
            <TextInput
                label="Password"
                value={password}
                secureTextEntry={showPassword}
                onChangeText={setPassword}
                right={<TextInput.Icon icon="eye" onPress={handleShowPassword} />}
                style={styles.input_password}
            />
            <View style={styles.row}>
                <Button icon="account-circle" mode="contained" onPress={() => navigation.navigate('Register')} style={styles.button_signup}>
                    Register
                </Button>
                <Button icon="login" mode="contained" onPress={handleLogin} style={styles.button_signin}>
                    Login
                </Button>
                
            </View>
        </View>
    ) :(
        <View style={styles.container}>
            <ActivityIndicator animating={loading} size="large" color="#00c4cc" />
        </View>
    )
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10,
    },
    logo: {
      alignSelf: 'center',
      marginBottom: 10,
      width: 300,
      height: 300,
      resizeMode: 'contain',
    },
    title: {
      textAlign: 'center',
      marginBottom: 16,
      fontFamily: 'sans-serif',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      textTransform: 'uppercase'
    },
    input_email: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
    },
    input_password: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
    },
    button_signin: {
        marginTop: 12,
        width: 190,
        backgroundColor: '#008AD8',
        color: '#fff',
    },
    button_signup: {
        marginTop: 12,
        width: 190,
        backgroundColor: '#4caf50',
        color: '#fff',
    },
  });

export default LoginScreen;
