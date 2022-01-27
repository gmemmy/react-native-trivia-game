import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  Alert, StyleSheet, Text, View,
} from 'react-native';
import Navigator from './src/navigator/navigator'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './src/rq'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigator />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
