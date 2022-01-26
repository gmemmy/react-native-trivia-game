import * as React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getHeight, getWidth } from '../utils/styles'


const ListItem = ({ item }: { item: Answer}) => {
  const { isCorrect, question } = item
  return (
    <Animatable.View style={styles.itemWrapper}>
      <Text style={styles.itemSign}>
        {isCorrect ? '+' : '-'}
      </Text>
      <Text style={styles.itemText}>{question}</Text>
    </Animatable.View>
  )
}

function Results({ navigation, route }: NavigationProps) {
  const { score, numOfQuestions, answers } = route?.params
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>You scored</Text>
      <Text style={styles.headerText}>{score} / {numOfQuestions}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={answers}
        renderItem={({ item, index }) => (
          <ListItem key={index} item={item} />
        )}
        contentContainerStyle={{ paddingHorizontal: getWidth(30) }}
        style={{ width: '100%' }}
        keyExtractor={(_, index) => `${index}`}
      />
      <TouchableOpacity 
        onPress={() => navigation?.reset({ index: 0, routes: [{ name: 'HomeScreen' }] })} 
        style={styles.button}
      >
        <Text style={styles.buttonText}>PLAY AGAIN?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? getHeight(40) : 0
  },
  headerText: {
    fontSize: getWidth(24),
    textAlign: 'center',
    fontWeight: '700'
  },
  button: {
    marginTop: 'auto'
  },
  buttonText: {
    fontSize: getWidth(24),
  },
  itemWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: getHeight(20),
    alignItems: 'flex-start'
  },
  itemText: {
    fontSize: getWidth(18),
    marginLeft: getWidth(20),
    color: '#828282'
  },
  itemSign: {
    fontSize: getWidth(30),
    color: '#828282'
  }
})

export default Results
