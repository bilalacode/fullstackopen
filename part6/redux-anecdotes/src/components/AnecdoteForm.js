import { useDispatch } from "react-redux";
// import { createAnecdote } from "../reducers/anecdoteReducer";

// import anecdoteService from './services/anecdotes'

import { createNew } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createNew(content));
    // dispatch(createNotification(`${newAnedcote.content} has been added.`));

    // setTimeout(() => dispatch(hideNotification()), 5000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
