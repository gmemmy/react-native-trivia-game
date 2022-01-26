
interface NavigationProps {
  navigation?: {
    goBack: () => void
    replace: (routeName: string, params: any) => void
    push: (routeName: string, params?: any) => void
    getParam: (paramName: string, defaultValue?: any) => any
    navigate: (routeName: string, params?: any) => void
    reset: ({index: number, routes: any}) => void
    dispatch: (action: any) => void
    state: {
      routeName: string
      key: string
      params: {
        [prop: string]: any
      }
    }
    addListener: (eventType: string, cb: (e: any) => any) => void
  }
  route?: {
    params: any
  }
}

interface QuestionsFetchResponse {
  response_code: number,
  results: QuestionProps[]
}

interface QuestionProps {
  category: string,
  type: string,
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
}

interface GameResult {
  score: number
  answers: Answer[]
}

interface Answer {
  question: string
  isCorrect: boolean
}