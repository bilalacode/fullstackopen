import { QueryClient, useMutation } from "react-query"
import { postAnecdote } from "../services/anecdotes"



const AnecdoteForm = () => {

const queryClient = new QueryClient()
const newAnecdoteMudation = useMutation(postAnecdote, {
  onSuccess: () => {
    queryClient.invalidateQueries('anecdotes')
  }
})

console.log(newAnecdoteMudation)
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    newAnecdoteMudation.mutate({content})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
