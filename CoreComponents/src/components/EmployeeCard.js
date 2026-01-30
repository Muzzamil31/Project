import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteEmployee } from '../api/api';

export default function EmployeeCard({ employee, onRefresh }) {
  const navigation = useNavigation();
  const imageUrl = employee.photo
    ? `http://192.168.0.137:5000/uploads/${employee.photo}`
    : null;

  //Handle delete action
  const handleDelete = async () => {
    await deleteEmployee(employee.id);
    onRefresh(); //Referesh list after delete
  };
  
  //Render the employee card ui
  return (
    //make the card pressable to navigate to edit form
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EmployeeForm', { employee })}>
      <View style={styles.row}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder} />
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{employee.name}</Text>
          <Text>{employee.position}</Text>
          <Text>{employee.department}</Text>
          <Text>{employee.email}</Text>
        </View>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.delete}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12 },
  placeholder: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#ccc', marginRight: 12 },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  delete: { fontSize: 18, color: 'red', paddingLeft: 8 },
});