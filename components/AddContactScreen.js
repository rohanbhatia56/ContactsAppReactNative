import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { createTable, addContact, updateContact, deleteContact, getContacts } from './Database';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from './Theme';

export default function AddContactScreen({ navigation }) {

    useFocusEffect(
        useCallback(() => {
            // Lock the drawer when this screen is focused
            navigation.getParent().setOptions({
                drawerLockMode: 'locked-closed'
            });

            return () => {
            // Unlock the drawer when this screen is unfocused
                navigation.getParent().setOptions({
                    drawerLockMode: 'unlocked'
                });
            };
        }, [navigation])
    );

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [landline, setLandline] = useState('');
    const [photo, setPhoto] = useState(null);
    const [favorite, setFavorite] = useState(false);

    const handleSave = () => {
        // Save the contact here
        addContact(name, mobile, landline, photo, favorite, (error, result) => {
            if (error) {
                console.log('Error adding contact:', error);
            } else {
                console.log('Contact added:', result);
            }
            navigation.goBack();
        });
    };

    const handleChoosePhoto = () => {
        launchImageLibrary({}, (response) => {
            if (response.assets && response.assets.length > 0) {
                setPhoto(response.assets[0].uri);
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
            <TextInput placeholder="Mobile" value={mobile} onChangeText={setMobile} style={styles.input} keyboardType="phone-pad" placeholderTextColor={theme.colors.placeholderTextColor} />
            <TextInput placeholder="Landline" value={landline} onChangeText={setLandline} style={styles.input} keyboardType="phone-pad" placeholderTextColor={theme.colors.placeholderTextColor} />
            <Button title="Save" onPress={handleSave}  testID="savebutton"  name="/arrow-back/i" />
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
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
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
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        color: theme.colors.text,
        paddingHorizontal: 8,
    },
});
