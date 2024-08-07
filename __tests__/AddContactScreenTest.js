import '@testing-library/jest-native';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { addContact } from '../components/Database';
import { useNavigation } from '@react-navigation/native';
import AddContactScreen from '../components/AddContactScreen';

const mockedNavigate = jest.fn();

// Mocking dependencies
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

jest.mock('../components/Database', () => ({
  addContact: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
    getParent: () => ({
      setOptions: jest.fn(),
    }),
  })),
}));

describe('AddContactScreen', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AddContactScreen />);
    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('Mobile')).toBeTruthy();
    expect(getByPlaceholderText('Landline')).toBeTruthy();
    expect(getByText('Save')).toBeTruthy();
  });
  
  test('updates state when text inputs are changed', () => {
    const { getByPlaceholderText } = render(<AddContactScreen />);
    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Mobile'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('Landline'), '0987654321');
    // Add assertions to verify state updates if using state testing libraries
  });
});
