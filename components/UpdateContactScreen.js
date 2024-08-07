import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,TouchableOpacity, Text, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { createTable, addContact, updateContact, deleteContact, getContacts } from './Database';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from './Theme';

export default function UpdateContactScreen({ route, navigation }) {
  const { contact } = route.params;
  const [id] = useState(contact.id);
  const [name, setName] = useState(contact.name);
  const [mobile, setMobile] = useState(contact.mobilePhone);
  const [landline, setLandline] = useState(contact.landlineNumber);
  const [photo, setPhoto] = useState(contact.photoURL);
  const [favorite, setFavorite] = useState(contact.favorite);
  console.log(contact)

  const handleUpdate = () => {
    // Update the contact here
    updateContact(id,name,mobile,landline,photo,favorite)
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteContact(id)
    // Delete the contact here
    navigation.goBack();
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0]);
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style ={styles.headerTitle}>Add New Contact</Text>
            <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                <Icon name={favorite ? "star" : "star-outline"} size={24} color="black" />
            </TouchableOpacity>
      </View>   
      <TouchableOpacity style={styles.photoContainer} onPress={handleChoosePhoto}>
                {photo ? (
                    <Image source={{ uri: photo }} style={styles.photo} />
                ) : (
                    <Icon name="camera" size={40} color="black" style={styles.placeholdericon} />
                )}
      </TouchableOpacity>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} placeholderTextColor={theme.colors.placeholderTextColor} />
      <TextInput placeholder="Mobile Phone" value={mobile} onChangeText={setMobile} style={styles.input} placeholderTextColor={theme.colors.placeholderTextColor}/>
      <TextInput placeholder="Landline" value={landline} onChangeText={setLandline} style={styles.input} placeholderTextColor={theme.colors.placeholderTextColor}/>
      <Button title="Update" onPress={handleUpdate} />
      <Button title="Delete" onPress={handleDelete} color="red" /> 
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: theme.colors.text,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    photoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 100,
        marginBottom: 16,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: 'gray',
        width: 150,
        height: 150,
        justifyContent: 'center',
        },
        photo: {
            width: 150,
            height: 150,
            borderRadius: 75,
        },
        placeholdericon: {
            alignItems: 'center',
            justifyContent: 'center',
        }
});
