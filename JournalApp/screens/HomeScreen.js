import React, { useState, useEffect } from 'react';
import { View, FlatList, StatusBar, StyleSheet } from 'react-native';
import { Text, Title, Button, IconButton} from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';

const HomeScreen = ({ navigation }) => {
  const [entries, setEntries] = useState([]);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            navigation.navigate('Home');
        }else{
            navigation.navigate('Login');
        }
    }, []);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        axios.get('http://localhost:4050/api/entries', 
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
        .then(response => {
            console.log(response.data);
            setEntries(response.data);
        })
        .catch(error => console.log(error));
    }, []);

    const deleteEntry = (entry_id) => {
        const access_token = localStorage.getItem('access_token');
        axios.delete(`http://localhost:4050/api/entries/delete/${entry_id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
        .then(response => {
            console.log(response.data);
            setEntries(response.data);
        })
        .catch(error => console.log(error));
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.nav_buttons}>
                <IconButton
                    style={styles.button_add_entry}
                    size={100}
                    mode="contained"
                    icon="chat-plus-outline" 
                    onPress={() => navigation.navigate('AddEntry')}
                
                />
                {/* <Text style={styles.button_text}>Add Entry</Text> */}
                <IconButton
                    style={styles.button_add_entry}
                    size={100}
                    icon="account"
                    mode="contained"
                    onPress={() => navigation.navigate('Profile')}
                />
            </View>
        <FlatList
            data={entries}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.entry}>
                <Title style={styles.title}>{item.title}</Title>
                <Text style={styles.content}>{item.content}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.date}>{moment(item.date).format('MMMM Do YYYY')}</Text>
                <Button style={styles.button_view} mode="contained" icon="book-open" onPress={() => navigation.navigate('EntryDetail', { entry: item })}>
                    <Text style={styles.button_text}>View</Text>
                </Button>
                <Button style={styles.button_delete} mode="contained" icon="delete-forever" onPress={() => deleteEntry(item.id)}>
                <Text style={styles.button_text}>Delete</Text>
                </Button>
            </View>
            )}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#fff',
    },
    nav_buttons: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 16,
    },
    entry: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        borderRadius: 10,
        letterSpacing: 0.4,
        lineHeight: 16,
    },
    content: {
        fontSize: 14,
        marginBottom: 8,
        borderRadius: 10,
        letterSpacing: 0.4,
        lineHeight: 16,
    },
    category: {
        fontSize: 14,
        marginBottom: 8,
        borderRadius: 10,
        letterSpacing: 0.4,
        lineHeight: 16,
    },
    date: {
        fontSize: 14,
        marginBottom: 8,
        borderRadius: 10,
        letterSpacing: 0.4,
        lineHeight: 16,
    },
    button_text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    button_add_entry: {
        marginTop: 12,
        borderRadius: 10,
        color: '#fff',
    },
    button_add_profile: {
        marginTop: 12,
        borderRadius: '10',
        color: '#fff',
    },
    button_view: {
        marginTop: 12,
        borderRadius: 10,
        backgroundColor: '#add8e6',
        color: '#fff',
    },
    button_delete: {
        marginTop: 12,
        borderRadius: 10,
        backgroundColor: '#ff0000',
        color: '#fff',
    },
});

export default HomeScreen;
