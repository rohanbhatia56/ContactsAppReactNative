import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { createTable, addContact, updateContact, deleteContact, getContacts } from './Database';
import { useFocusEffect } from '@react-navigation/native';
import { FloatingAction } from 'react-native-floating-action';
import { theme } from './Theme';

export default function ContactListScreen({ navigation }) {
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchContacts = () => {
        getContacts(setContacts);
    };

    useEffect(() => {
        createTable();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchContacts();
            console.log(contacts)
        }, [])
    );

    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    const filteredContacts = sortedContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEditContact = (contact) => {
        navigation.navigate('UpdateContact', { contact });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search Contacts"
                placeholderTextColor={theme.colors.placeholderTextColor}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <SwipeListView
                data={filteredContacts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.contactItem}>
                        <Image  source={{uri: item.photoURL}} style={styles.photo} />
                        <Text style={styles.backTextBlack}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                renderHiddenItem={({ item }) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={styles.backRightBtn} onPress={() => handleEditContact(item)}>
                            <Text style={styles.backTextWhite}>Edit/Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-75}
            />
            <FloatingAction
                position="right"
                onPressMain={() => navigation.navigate('AddContact')}
                showBackground={false}
                floatingIcon={require('../assets/images/plus.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        color: theme.colors.text,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
    },
    photo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 16,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        backgroundColor: 'blue',
        right: 0,
    },
    backTextWhite: {
        color: 'white',
    },
    backTextBlack: {
        color: '#000',
    },
});
