import { useSelector, useDispatch } from "react-redux";
import FilterForm from "./FilterForm";
import { createNotification, hideNotification } from "../reducers/notificationReducer";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => {

    if(state.filter === ""){
      return state.anecdotes
    }

    return state.anecdotes.filter(x => x.content.includes(state.filter))
  });
  const dispatch = useDispatch();
  const handleClick = (anecdote) => {
    dispatch({type: 'anecdote/addVote', payload: anecdote.id})
    dispatch(createNotification(`You votes ${anecdote.content}`));
    
    setTimeout(() => dispatch(hideNotification()), 5000)

  }


  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterForm />
      {anecdotes
      .slice()
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleClick(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Anecdotes;
