import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const toaster = useToast();

    const handleToast = (message, type) => {
        toaster.show({ message: message, type: type, position: 'top' });
    };

    const handleRegister = () => {
        if (firstName == '' || lastName == '' || email == '' || password ==''){
            const message = 'Please fill all fields';
            const the_type = 'warning';
            handleToast(message, the_type);
            return;
        }
        setLoading(true);
        axios.post('http://localhost:4050/api/register', { 
            firstName, lastName, email, password 
        })
        .then(response => {
            console.log(response.data);
            const message = response.data.message;
            const the_type = 'success';
            handleToast(message, the_type);
            navigation.navigate('Login');
        })
        .catch(error => {
            setLoading(false)
            const message = 'Error!';
            const the_type = 'error';
            handleToast(message, the_type);
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
        <Title style={styles.title}>Register</Title>
        <View style={styles.row}>
            <TextInput
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={styles.input_firstName}
            />
            <TextInput
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                    style={styles.input_lastName}
            />
        </View>
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
            <Button icon="login" mode="contained" style={styles.button_signin} onPress={() => navigation.navigate('Login')}>
                Sign In
            </Button>
            <Button icon="content-save" mode="contained" style={styles.button_signup} onPress={handleRegister}>
                Sign Up
            </Button>
        </View>
    </View>
    ):(
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
        padding: 5,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10,
    },
    logo: {
        alignSelf: 'center',
        marginBottom: 0,
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    title: {
        textAlign: 'center',
        marginBottom: 12,
        fontFamily: 'sans-serif',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textTransform: 'uppercase'
    },
    input_firstName: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
        width: 200,
        alignContent: 'start',
        alignItems: 'start',
    },
    input_lastName: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
        width: 200,
        alignContent: 'start',
        alignItems: 'start',
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

export default RegisterScreen;
