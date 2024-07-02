import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StepProvider } from './src/context/StepContext';
import MainStack from './src/navigations/Stack/MainStack';
import ApiCallScreen from './src/navigations/Screens/ApiCallScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StepProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </StepProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
