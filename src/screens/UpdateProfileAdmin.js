import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-picker/picker';
import { useNavigation, StackActions } from '@react-navigation/native';

const hostels = [
  { label: 'G1', value: 'G1' },
  { label: 'G2', value: 'G2' },
  { label: 'G3', value: 'G3' },
  { label: 'G4', value: 'G4' },
  { label: 'G5', value: 'G5' },
  { label: 'G6', value: 'G6' },
  { label: 'B1', value: 'B1' },
  { label: 'B2', value: 'B2' },
  { label: 'B3', value: 'B3' },
  { label: 'B4', value: 'B4' },
  { label: 'B5', value: 'B5' },
  { label: 'Y3', value: 'Y3' },
  { label: 'Y4', value: 'Y4' },
  { label: 'O3', value: 'O3' },
  { label: 'O4', value: 'O4' },
  { label: 'I2', value: 'I2' },
  { label: 'I3', value: 'I3' },
];

const UpdateProfile = () => {

  const navigation = useNavigation();

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newHostel, setNewHostel] = useState('');

  const handleUpdatePassword = async () => {
    try {
      await auth().signInWithEmailAndPassword(auth().currentUser.email, password1);
      await auth().currentUser.updatePassword(newPassword);
      Alert.alert('Success', 'Password updated successfully.');
      await auth().signOut();
      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      console.error('Error updating password: ', error);
      Alert.alert('Error', 'Failed to update password. Please check your current password.');
    }
  };

  const handleUpdateProfile = async () => {
  try{
    await auth().signInWithEmailAndPassword(auth().currentUser.email, password2);
    if (newHostel == "") {
      Alert.alert('Error', 'Invalid hostel name. Please select from the provided options.');
      return;
    }

    try {
      const userId = auth().currentUser.uid;
      await firestore().collection('admins').doc(userId).update({
        hostel: newHostel
      });
      Alert.alert('Success', 'Profile updated successfully.');
      navigation.navigate('HomeAdmin');
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    }
  } catch(error){
      console.error('Error updating password: ', error);
      Alert.alert('Error', 'Failed to update password. Please check your current password.');
  }

  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        placeholderTextColor="#FFFFFF" // White placeholder text color
        secureTextEntry
        value={password1}
        onChangeText={setPassword1}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#FFFFFF" // White placeholder text color
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity onPress={handleUpdatePassword} style={[styles.button, { width: '45%' }]}>
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>

      <Text style={[styles.heading,{marginTop: 40}]}>Update Hostel Name</Text>
      <Picker
        style={styles.picker}
        selectedValue={newHostel}
        onValueChange={(value) => setNewHostel(value)}
      >
        <Picker.Item label="Select Hostel" value="" />
        {hostels.map((hostel, index) => (
          <Picker.Item key={index} label={hostel.label} value={hostel.value} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#FFFFFF" // White placeholder text color
        secureTextEntry
        value={password2}
        onChangeText={setPassword2}
      />
      <TouchableOpacity onPress={handleUpdateProfile} style={[styles.button, { width: '45%' }]}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212121', // Dark background color
  },
  heading: {
    color: '#FFFFFF', // White text color
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#FFFFFF', // White text color
    backgroundColor: '#424242', // Dark gray background color
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    color: '#FFFFFF', // White text color
    backgroundColor: '#424242', // Dark gray background color
  },
  button: {
      borderRadius: 20,
      alignSelf: 'center', // Align to center horizontally
      backgroundColor: '#009688', // Button color
      padding: 10,
      marginTop: 10,
    },
  buttonText: {
      color: '#FFFFFF', // White text color
      textAlign: 'center',
    },
});

export default UpdateProfile;
