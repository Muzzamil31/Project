import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchEmployees } from '../api/api';
import EmployeeCard from '../components/EmployeeCard';
import styles from '../styles/styles';

export default function EmployeeListScreen() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  // Get navigation object for screen transitions
  const navigation = useNavigation();
  // Function to load employee data from API
  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees(); // Fetch employee list
      setEmployees(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reload employees every time screen comes into focus
    const unsubscribe = navigation.addListener('focus', loadEmployees);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Employee Directory</Text>
      <Button title="Add Employee" onPress={() => navigation.navigate('EmployeeForm')} />
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        // Render employee list using FlatList
        <FlatList
          data={employees} // List of employees
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EmployeeCard employee={item} onRefresh={loadEmployees} />
          )}
        />
      )}
    </View>
  );
}