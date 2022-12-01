import { useState } from 'react'



const Title = ({text}) => <h1>{text}</h1>
const Anecdote = ({anecdote, vote}) => {
  return(
    <>
    {anecdote}
    <br>
    </br>
    has {vote} votes
    </>
  )
}

const Button = ({handleEvent, text}) => <button onClick={handleEvent}>{text}</button> 

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [vote, updateVote] = useState(new Uint8Array(7))
  const randomNumber = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const mostVotes = Math.max(...vote)
  const mostVotesInd = vote.indexOf(mostVotes)
  const handleVote = () => {
    const newVote = [...vote]
    newVote[selected] += 1
    updateVote(newVote)
  }

 
 
  return (
    <div>
      <Title text={"Anecdote of the day"}/>
      <Anecdote anecdote={anecdotes[selected]} vote={vote[selected  ]} />
       
      <br></br>
      <Button handleEvent={handleVote} text={"vote"}/>
      <Button handleEvent={randomNumber} text={"next anecdote"} />

      <br></br>
      <Title text={"Anecdote with most votes"}/>
      <Anecdote anecdote={anecdotes[mostVotesInd]} vote={mostVotes} />
    </div>
  )
}

export default App
