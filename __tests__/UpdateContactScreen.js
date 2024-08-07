import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UpdateContactScreen from '../components/UpdateContactScreen';
import { updateContact, deleteContact } from '../components/Database';
import '@testing-library/jest-native';

jest.mock('../components/Database', () => ({
  updateContact: jest.fn(),
  deleteContact: jest.fn(),
}));

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn((options, callback) => {
    callback({ assets: [{ uri: 'test-uri' }] });
  }),
}));

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

const mockRoute = {
  params: {
    contact: {
      id: '1',
      name: 'John Doe',
      mobilePhone: '1234567890',
      landlineNumber: '0987654321',
      photoURL: null,
      favorite: false,
    },
  },
};

const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
};

describe('UpdateContactScreen', () => {
  it('renders correctly with contact details', () => {
    const { getByPlaceholderText, getByText } = render(
      <UpdateContactScreen route={mockRoute} navigation={mockNavigation} />
    );

    expect(getByPlaceholderText('Name').props.value).toBe('John Doe');
    expect(getByPlaceholderText('Mobile Phone').props.value).toBe('1234567890');
    expect(getByPlaceholderText('Landline').props.value).toBe('0987654321');
    expect(getByText('Update')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('updates the contact details when update button is pressed', () => {
    const { getByText } = render(
      <UpdateContactScreen route={mockRoute} navigation={mockNavigation} />
    );

    fireEvent.press(getByText('Update'));
    expect(updateContact).toHaveBeenCalledWith(
      '1',
      'John Doe',
      '1234567890',
      '0987654321',
      null,
      false
    );
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('deletes the contact when delete button is pressed', () => {
    const { getByText } = render(
      <UpdateContactScreen route={mockRoute} navigation={mockNavigation} />
    );

    fireEvent.press(getByText('Delete'));
    expect(deleteContact).toHaveBeenCalledWith('1');
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('updates input values correctly', () => {
    const { getByPlaceholderText } = render(
      <UpdateContactScreen route={mockRoute} navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'Jane Doe');
    fireEvent.changeText(getByPlaceholderText('Mobile Phone'), '1112223333');
    fireEvent.changeText(getByPlaceholderText('Landline'), '4445556666');

    expect(getByPlaceholderText('Name').props.value).toBe('Jane Doe');
    expect(getByPlaceholderText('Mobile Phone').props.value).toBe('1112223333');
    expect(getByPlaceholderText('Landline').props.value).toBe('4445556666');
  });
});
