import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import FilterForm from "./FilterForm";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => {
    // console.log("Here are an", state.anecdotes)
    // return state.anecdotes
    if(state.filter === ""){
      return state.anecdotes
    }

    return state.anecdotes.filter(x => x.content.includes(state.filter))
  });
  const dispatch = useDispatch();

  //   const vote = (id) => {
  //     console.log("vote", id);
  //   };

  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterForm />
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Anecdotes;
