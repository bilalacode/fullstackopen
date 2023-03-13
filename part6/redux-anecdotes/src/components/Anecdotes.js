import { useSelector, useDispatch } from "react-redux";
import { vote, anecdote } from "../reducers/anecdoteReducer";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  //   const vote = (id) => {
  //     console.log("vote", id);
  //   };

  return (
    <div>
      <h2>Anecdotes</h2>
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
