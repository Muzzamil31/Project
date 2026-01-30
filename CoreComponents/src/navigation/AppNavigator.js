import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Import stack navigator for screen transitions
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import individual screens used in the navigation stack
import EmployeeListScreen from '../screens/EmployeeListScreen';
import EmployeeFormScreen from '../screens/EmployeeFormScreen';
import EmployeeDetailScreen from '../screens/EmployeeDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="EmployeeList" component={EmployeeListScreen} />
        <Stack.Screen name="EmployeeForm" component={EmployeeFormScreen} />
        <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}