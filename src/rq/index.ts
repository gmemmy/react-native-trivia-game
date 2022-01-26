import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // extend stale time to one minute
      staleTime: 1000 * 60
    }
  }
})
