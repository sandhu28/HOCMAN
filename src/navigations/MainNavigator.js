import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// imports screens
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import AddComplaint from '../screens/AddComplaint';
import ReviewComplaint from '../screens/ReviewComplaint';
import UpdateHostelDetails from '../screens/UpdateHostelDetails';
import FullComplaint from '../screens/FullComplaint';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
                  name="AddComplaint"
                  component={AddComplaint}
                  options={{headerShown: false}}
                />
        <Stack.Screen
                          name="ReviewComplaint"
                          component={ReviewComplaint}
                          options={{headerShown: false}}
                        />
       <Stack.Screen
                                 name="FullComplaint"
                                 component={FullComplaint}
                                 options={{headerShown: false}}
                               />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;