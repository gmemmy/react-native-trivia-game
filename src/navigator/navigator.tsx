import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home, Quiz, Results } from '../screens'

const Stack = createStackNavigator()

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="QuizScreen" component={Quiz} />
        <Stack.Screen name="ResultsScreen" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
