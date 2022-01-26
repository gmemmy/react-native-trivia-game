import axios, { AxiosResponse } from 'axios'

export const fetchQuestions = () =>
  axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    .then((res: AxiosResponse<QuestionsFetchResponse>) => res?.data?.results)
    