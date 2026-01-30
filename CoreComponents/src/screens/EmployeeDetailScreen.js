import React from 'react';
//import react native components 
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteEmployee } from '../api/api';

export default function EmployeeDetailScreen() {
  // Extract employee data and refresh callback from route parameters
  const { employee, onRefresh } = useRoute().params;
  const navigation = useNavigation();

  // Construct image URL if employee has a photo, otherwise set to null
  const imageUrl = employee.photo
    ? `http://192.168.0.137:5000/uploads/${employee.photo}`
    : null;

  const handleDelete = async () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this employee?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            // Call API to delete employee
            await deleteEmployee(employee.id);
            // Show success alert
            Alert.alert('Deleted', 'Employee has been removed.');
            // Refresh list if callback is provided
            if (onRefresh) onRefresh();
            // Navigate back to previous screen
            navigation.goBack();
          } catch (error) {
            Alert.alert('Error', error.message || 'Failed to delete employee.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.avatar} />}
      <Text style={styles.name}>{employee.name}</Text>
      <Text style={styles.info}>{employee.position}</Text>
      <Text style={styles.info}>{employee.department}</Text>
      <Text style={styles.info}>{employee.email}</Text>

      <View style={styles.buttonGroup}>
        <Button title="Edit" onPress={() => navigation.navigate('EmployeeForm', { employee, onRefresh })} />
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, alignSelf: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  info: { fontSize: 16, marginBottom: 6, textAlign: 'center' },
  buttonGroup: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' },
});