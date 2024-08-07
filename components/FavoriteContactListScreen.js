import React, {useState, useCallback} from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {getFavoriteContacts } from './Database';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from './Theme';

export default function FavoriteContactListScreen({ navigation }) {
  const [favoriteContacts, setFavoriteContacts] = useState([]);
    
  const fetchContacts = () => {
      getFavoriteContacts(setFavoriteContacts)
  };

  useFocusEffect(
      useCallback(() => {
        fetchContacts();
      }, [])
  );

  const sortedContacts = favoriteContacts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem} onPress={() => navigation.navigate('UpdateContact', { contact: item })}>
            <Image source={{uri: item.photoURL}} style={styles.photo} />
            <Text style={{color:theme.colors.text}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
});
