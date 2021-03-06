import * as React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultStyles, getHeight, getWidth } from '../utils/styles'

function Home({ navigation }: NavigationProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={defaultStyles.defaultHeader}>Welcome to the Trivia Challenge!</Text>
      </View>
      <View style={styles.contentBody}>
        <Text style={styles.contentText}>You will be presented with 10 True or False questions.</Text>
        <Text style={[styles.contentText, { marginTop: getHeight(100) }]}>Can you score 100%?</Text>
      </View>
      <TouchableOpacity onPress={() => navigation?.navigate('QuizScreen')} style={styles.button}>
        <Text style={styles.buttonText}>BEGIN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.screenContainer,
    paddingBottom: Platform.OS === 'android' ? getHeight(60) : 0
  },
  headerWrapper: {
    width: getWidth(200),
  },
  contentBody: {
    justifyContent: 'center',
    flex: 1,
    width: getWidth(250),
  },
  contentText: {
    fontSize: getWidth(24),
    textAlign: 'center',
  },
  button: {
    marginTop: 'auto'
  },
  buttonText: {
    fontSize: getWidth(24),
  }
})

export default Home
