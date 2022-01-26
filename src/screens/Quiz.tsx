import * as React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { fetchQuestions } from '../api'
import { getHeight, getWidth } from '../utils/styles'

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity)

function Quiz({ navigation }: NavigationProps) {
  const [currentQuestion, setCurrentQuestion] = React.useState(1)
  const questionRef = React.useRef(null)
  const [result, setResult] = React.useState<GameResult>({
    score: 0,
    answers: []
  })
  const { isLoading, isError, data, refetch, isRefetching, isSuccess } = useQuery('questions', fetchQuestions)

  const question = (data ? data[currentQuestion - 1] : {}) as QuestionProps

  const handleOptionSelect = (res: 'True' | 'False') => {
    validateResponse(res)
    if (data && currentQuestion < data?.length) {
      setCurrentQuestion(currentQuestion + 1)
      questionRef?.current?.startAnimation()
    } else {
      navigation?.navigate('ResultsScreen', {
        score: result.score,
        numOfQuestions: data?.length,
        answers: result.answers
      })
    }
  }

  const validateResponse = (res: string) => {
    const isAnswerCorrect = question?.correct_answer === res
    setResult({
      ...result, 
      score: isAnswerCorrect ? result.score + 1 : result.score,
      answers: [
        ...result.answers,
        {
          question: question?.question,
          isCorrect: isAnswerCorrect
        }
      ]
    })
  }

  if (isLoading || isRefetching) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size={50} color="#000" />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.errorMessage}>Oops! Unable to retrieve your questions at this time.</Text>
        <TouchableOpacity 
          style={[styles.button, { marginTop: getHeight(20) }]}
          onPress={() => refetch()}
          >
          <Text>Try again</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (data && data?.length < 1) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.errorMessage}>There are no currently no questions at this time.</Text>
        <TouchableOpacity 
          style={[styles.button, { marginTop: getHeight(20) }]}
          onPress={() => navigation?.goBack()}
          >
          <Text>Go back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>{question?.category}</Text>
      <View style={styles.contentWrapper}>
        <View style={styles.boxWrapper}>
          <Animatable.Text ref={questionRef} style={styles.question} animation="fadeIn">
            {question?.question}
          </Animatable.Text>
        </View>
        <Text style={styles.questionCount}>{currentQuestion} of {data?.length}</Text>
        <View style={styles.buttonsWrapper}>
          <AnimatedButton 
            style={styles.button} 
            animation="slideInLeft" 
            onPress={() => handleOptionSelect('True')}>
            <Text>True</Text>
          </AnimatedButton>
          <AnimatedButton 
            style={styles.button} 
            animation="slideInRight"
            onPress={() => handleOptionSelect('False')}
            >
            <Text>False</Text>
          </AnimatedButton>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    paddingHorizontal: getWidth(30)
  },
  headerText: {
    fontSize: getWidth(24),
    textAlign: 'center',
    fontWeight: '700'
  },
  boxWrapper: {
    height: getHeight(300),
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getWidth(40)
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  questionCount: {
    textAlign: 'center',
    marginTop: getHeight(20),
    fontSize: getWidth(24),
  },
  question: {
    textAlign: 'center',
    fontSize: getWidth(24),
  },
  buttonsWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: getHeight(40),
  },
  button: {
    width: getWidth(100),
    height: getHeight(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: getWidth(24),
  }
})

export default Quiz
