import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TestForm from './TestForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TestForm />
    </SafeAreaView>
  );
}

export default App;
