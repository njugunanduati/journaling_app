import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { TextInput, Button,Text, Title, Surface, Divider, Switch } from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const toaster = useToast();

    const handleToast = (message, type) => {
        toaster.show({ message: message, type: type, position: 'top' });
    };

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            navigation.navigate('Profile');
        }else{
            navigation.navigate('Login');
        }
    }, []);

    const changeEditMode = () => {
        setEditMode(!editMode);
    };

    const cancelEditMode = () => {
        setEditMode(false);
    };

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        axios.get(`http://localhost:4050/api/profile`, 
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(response => {
            // Save token and navigate to Home
            console.log(response.data);
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setEmail(response.data.email);
        }).catch(error => {
            setLoading(false)
            console.log(error)
        });
    }, []);

    const handleUpdate = () => {
        if (firstName == '' || lastName == '' || email == '' || password ==''){
            const message = 'Please fill all fields';
            const the_type = 'warning';
            handleToast(message, the_type);
            return;
        }
        setLoading(true);
        const access_token = localStorage.getItem('access_token');
        const data = { firstName, lastName, email, password };
        axios.put(`http://localhost:4050/api/profile/`, 
            data, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(response => {
            // Save token and navigate to Home
            // save the access_token to the local storage
            localStorage.setItem('access_token', response.data.access_token);
            console.log(response.data);
            navigation.navigate('Profile');
        }).catch(error => {
            setLoading(false)
            console.log(error)
        });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleGoBack = () => {
        setEditMode(false);
        navigation.navigate('Home');
    };

  return (
    (editMode == false)? (
        <View style={styles.container}>
            <Title style={styles.title}>Profile</Title>
            <Surface style={styles.surface}>
                <View style={styles.row}>
                    <Text style={styles.text_first_name}>{firstName}</Text>
                    <Text style={styles.text_last_name}>{lastName}</Text>
                </View>
                <Divider />
                <Text style={styles.text_email}>{email}</Text>
                <Divider />
            </Surface>
            <View style={styles.row}>
                <Button icon="pencil" mode="contained" onPress={changeEditMode} style={styles.button_edit}>
                    Edit
                </Button>
                <Button icon="content-save" mode="contained" onPress={handleGoBack} style={styles.button_cancel}>
                    Cancel
                </Button>
            </View>
        </View>
    ): (
        <View style={styles.container}>
            <Title style={styles.title}>Profile Edit</Title> 
            <TextInput 
                style={styles.input_first_name}
                onChangeText={setFirstName}
                placeholder="First Name"
                value={firstName}
            />
            <TextInput 
                style={styles.input_last_name}
                onChangeText={setLastName}
                placeholder="Last Name"
                value={lastName}
            />
            <TextInput 
                style={styles.input_email}
                onChangeText={setEmail}
                placeholder="Email"
                value={email}
                disabled
            />
            <View style={styles.row_switch}>
                <Text style={styles.update_password_switch}>Update Password</Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
            <TextInput
                label="Password"
                value={password}
                secureTextEntry={showPassword}
                onChangeText={setPassword}
                right={<TextInput.Icon icon="eye" onPress={handleShowPassword} />}
                style={styles.input_password}
                disabled={(isSwitchOn == true)? false: true}
            />
            <View style={styles.row}>
                <Button icon="content-save" mode="contained" onPress={handleUpdate} style={styles.button_edit}>
                    update
                </Button>
                <Button icon="content-save" mode="contained" onPress={cancelEditMode} style={styles.button_cancel}>
                    Cancel
                </Button>
            </View>
            
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
    row_switch: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10,
        padding: 16,
    },
    title: {
        alignSelf: 'center',
        marginBottom: 10,
        width: 200,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontStyle: 'bold',
    },
    surface: {
        marginTop: 10,
        padding: 16,
        borderRadius: 10,
        elevation: 4,
        alignItems: 'start',
        justifyContent: 'start',
        backgroundColor: 'rgba(255, 255, 255)',
        width: '100%',
    },
    text_first_name:{
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        padding: 16,
    },
    text_last_name:{
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        padding: 16,
    },
    text_email:{
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input_first_name: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
    },
    input_last_name: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
    },
    input_email: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
    },
    input_password:{
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
    },
    update_password_switch: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    button_edit: {
        marginTop: 12,
        width: 190,
        backgroundColor: '#008AD8',
        color: '#fff',
    },
    button_cancel: {
        marginTop: 12,
        width: 190,
        backgroundColor: '#4caf50',
        color: '#fff',
    }
});

export default ProfileScreen;
