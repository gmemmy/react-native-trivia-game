import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import {
  Alert, StyleSheet, Text, View,
} from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler'
import Navigator from './src/navigator/navigator'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './src/rq'

// const errorHandler = (e, isFatal) => {
//   if (isFatal) {
//     Alert.alert(
//       'Unexpected error occurred',
//       `Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${
//         e.message
//       }. Please close the app and start again!`,
//       [
//         {
//           text: 'Close',
//         },
//       ],
//     );
//   } else {
//     console.log(e); // So that we can see it in the ADB logs in case of Android if needed
//   }
// };

// setJSExceptionHandler(errorHandler, true);

// setNativeExceptionHandler((errorString) => {
//   console.log('setNativeExceptionHandler', errorString);
// });

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false)
  useEffect(() => {
    Font.loadAsync({
      'OverPassRegular': require('./assets/fonts/overpass_regular.ttf'),
      'OverPassBold': require('./assets/fonts/overpass_bold.ttf')
    }).then(() => setIsFontLoaded(true))

    return () => {
      setIsFontLoaded(false)
    }

  }, [])

  if (!isFontLoaded) {
    return <View />
  }

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
