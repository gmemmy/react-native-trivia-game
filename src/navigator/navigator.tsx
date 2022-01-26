import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home, Quiz, Results } from '../screens'

const Stack = createStackNavigator()

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="QuizScreen" component={Quiz} options={{
          gestureEnabled: false,
        }} />
        <Stack.Screen name="ResultsScreen" component={Results} options={{
          gestureEnabled: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
