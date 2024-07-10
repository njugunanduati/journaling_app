import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import axios from 'axios';

const AddEntryScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const toaster = useToast();

  const handleToast = (message, type) => {
    toaster.show({ message: message, type: type, position: 'top' });
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        navigation.navigate('AddEntry');
    }else{
        navigation.navigate('Login');
    }
  }, []);

  const handleAddEntry = () => {
    if (title == '' || content == '' || category ==''){
      const message = 'Please fill all fields';
      const the_type = 'warning';
      handleToast(message, the_type);
      return;
  }
    const access_token = localStorage.getItem('access_token');
    axios.post('http://localhost:4050/api/entries', { title, content, category },
        {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }
    )
      .then(response => {
        console.log(response.data);
        const message = response.data.message;
        const the_type = 'success';
        handleToast(message, the_type);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error)
        const message = 'Error!';
        const the_type = 'error';
        handleToast(message, the_type);
      });
  };

  return (
    (loading == false)? (
    <View style={styles.container}>
    <Title style={styles.title}>Add Entry</Title>
      <TextInput
        label="Title"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Category"
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        label="Content"
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />
      <Button style={styles.button_add_entry} icon="content-save" mode="contained" onPress={handleAddEntry}>
        <Text>Add Entry</Text>
      </Button>
    </View>):(<View style={styles.container}>
      <ActivityIndicator animating={loading} size="large" color="#00c4cc" />
    </View>)
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#fff',
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
  input_title: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  input_content: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  input_category: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  button_add_entry: {
    marginTop: 12,
    borderRadius: 10,
    color: 'white',
  }
});

export default AddEntryScreen;
