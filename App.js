import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import ContactListScreen from './components/ContactListScreen';
import AddContactScreen from './components/AddContactScreen';
import UpdateContactScreen from './components/UpdateContactScreen';
import FavoriteContactListScreen from './components/FavoriteContactListScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="ContactList" component={ContactListScreen} options={{ title: 'Contact List', headerShown: false }} />
    <Stack.Screen name="AddContact" component={AddContactScreen} options={{ title: 'Add New Contact', headerShown: false}} />
    <Stack.Screen name="UpdateContact" component={UpdateContactScreen} options={{ title: 'Update Contact', headerShown: false}} />
  </Stack.Navigator>  
);

const AppDrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="ContactList" >    
    <Drawer.Screen name="ContactList" component={MainStackNavigator} />
    <Drawer.Screen name="FavoriteContacts" component={FavoriteContactListScreen} options={{ title: 'Favorite Contact List' }} />
  </Drawer.Navigator>
);


export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
        <AppDrawerNavigator/>
    </NavigationContainer>
  </SafeAreaProvider>
  );
}
