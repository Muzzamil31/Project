import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, Image, Alert, ScrollView, TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { addEmployee, updateEmployee } from '../api/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/styles';

export default function EmployeeFormScreen() {
  // Form fields
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const existing = route.params?.employee; // Check if editing an existing employee

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setPosition(existing.position);
      setDepartment(existing.department);
      setEmail(existing.email);
      // Load existing photo if available
      if (existing.photo) {
        setPhoto({ uri: `http://192.168.0.137:5000/uploads/${existing.photo}` });
      }
    }
  }, []);

  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera roll access is required.');
      return;
    }
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    //if image is selected update state
    if (!result.canceled && result.assets?.length > 0) {
      setPhoto(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      Alert.alert('Validation Error', 'Name and Email are required.');
      return;
    }
   //prepare form data for submission
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('department', department);
    formData.append('email', email);
   // Attach photo if selected
    if (photo?.uri) {
      const fileName = photo.uri.split('/').pop(); // Extract filename
      const match = /\.(\w+)$/.exec(fileName);  // Extract extension
      const ext = match ? match[1] : 'jpg';
      const mimeType = `image/${ext}`;

      formData.append('photo', {
        uri: photo.uri,
        name: fileName,
        type: mimeType,
      });
    }

    try {
      // Update if editing, otherwise add new employee
      if (existing) {
        await updateEmployee(existing.id, formData);
        Alert.alert('Success', 'Employee updated!');
      } else {
        formData.append('id', uuid.v4());
        await addEmployee(formData);
        Alert.alert('Success', 'Employee added!');
      }
      // Refresh list if callback is provided
      if (route.params?.onRefresh) {
        route.params.onRefresh();
      }
      // Navigate back to previous screen
      navigation.goBack();
    } catch (error) {
      console.error('❌ Error:', error.message);
      Alert.alert('Error', error.message || 'Failed to submit form.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        {existing ? 'Edit Employee' : 'Add Employee'}
      </Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Position" value={position} onChangeText={setPosition} style={styles.input} />
      <TextInput placeholder="Department" value={department} onChangeText={setDepartment} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />

      <Button title="Pick Photo" onPress={pickImage} />
      {photo?.uri && (
        <Image source={{ uri: photo.uri }} style={{ width: 100, height: 100, marginVertical: 10, borderRadius: 50, alignSelf: 'center' }} />
      )}

      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.submitButton}>
          {existing ? 'Update' : 'Add'} Employee
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}