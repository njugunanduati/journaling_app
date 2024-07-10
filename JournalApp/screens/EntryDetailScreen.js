import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Divider,TextInput, Button, Text, Title, Surface } from 'react-native-paper';
import moment from 'moment';

const EntryDetailScreen = ({ route, navigation }) => {
    console.log('route', route)
    const { entry } = route.params;
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(entry.title);
    const [content, setContent] = useState(entry.content);
    const [category, setCategory] = useState(entry.category);
    const [loading, setLoading] = useState(false);


    const changeEditMode = () => {
        setEditMode(!editMode);
    };

    const cancelEditMode = () => {
        setEditMode(false);
    };

    const handleEdit = () => {
        setLoading(true);
        const entry_id = entry.id;
        const access_token = localStorage.getItem('access_token');
        const data = { title, content, category };
        axios.post(`http://localhost:4050/api/entries/update/${entry_id}`, 
            data, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(response => {
            // Save token and navigate to Home
            console.log(response.data);
            navigation.navigate('Home');
        }).catch(error => {
            setLoading(false)
            console.log(error)
        });
    };

  return (
    (editMode == false)? (
        <View style={styles.container}>
            <Surface style={styles.surface}>
                <Divider />
                <Title style={styles.text_title}>{title}</Title>
                <Divider />
                <Text style={styles.text_content}>{content}</Text>
                <Divider />
                <Text style={styles.text_category}>{category}</Text>
                <Divider />
                <Text style={styles.text_date}>{moment(entry.date).format('MMMM Do YYYY')}</Text>
                <Divider />
            </Surface>
            <View style={styles.row}>
                <Button icon="pencil" mode="contained" onPress={changeEditMode} style={styles.button_edit}>
                    Edit
                </Button>
                <Button icon="cancel" mode="contained" onPress={() => navigation.navigate('Home')} style={styles.button_cancel}>
                    Cancel
                </Button>
            </View>
        </View>
    ): (
        (loading == false) ? (
            <View style={styles.container}>
            <Surface style={styles.surface}>
                <TextInput
                    label="Title"
                    style={styles.input_title}
                    onChangeText={setTitle}
                    placeholder="Title"
                    value={title}
                />
                <TextInput 
                    label="Content"
                    style={styles.input_content}
                    onChangeText={setContent}
                    placeholder="Content"
                    value={content}
                    multiline={true}
                />
                <TextInput
                    label="Category"
                    style={styles.input_category}
                    onChangeText={setCategory}
                    placeholder="Category"
                    value={category}
                    multiline={true}
                />
            </Surface>
            <View style={styles.row}>
                <Button icon="content-save" mode="contained" onPress={handleEdit} style={styles.button_edit}>
                    <Text style={styles.button_text}>Edit</Text>
                </Button>
                <Button icon="content-save" mode="contained" onPress={cancelEditMode} style={styles.button_cancel}>
                    Cancel
                </Button>
            </View>
        </View>
        ):(
        <View style={styles.container}>
            <ActivityIndicator animating={loading} size="large" color="#00c4cc" />
        </View>
        )
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
    text_title:{
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    text_content:{
        fontSize: 14,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    text_category:{
        fontSize: 12,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    text_date:{
        fontSize: 12,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input_title: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
        width: '100%',
    },
    input_content: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
        width: '100%',
    },
    input_category: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderBlockColor: 'rgba(255, 255, 255,)',
        padding: 8,
        borderRadius: 10,
        width: '100%',
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
    },
    button_text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default EntryDetailScreen;
