import { createSlice, current } from "@reduxjs/toolkit";
import anecdotesService from "../components/services/anecdotes";
// import {
//   createNotification,
//   hideNotification,
// } from "../reducers/notificationReducer";
import { setNotification } from "../reducers/notificationReducer";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// const initialState = anecdotesAtStart.map(asObject);
const initialState = [];
const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      console.log(initialState, "initial state");
      console.log(action.payload, "payload");
      console.log(current(state), "state");
      const newAnecdote = asObject(action.payload);
      return [...state, newAnecdote];
    },
    addVote(state, action) {
      const id = action.payload;
      const voteToAdd = state.find((n) => n.id === id);
      const votes = voteToAdd.votes;
      const addedVote = {
        ...voteToAdd,
        votes: votes + 1,
      };
      const updatedState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : addedVote
      );
      return updatedState;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    return dispatch(setAnecdotes(anecdotes));
  };
};

export const addNewVote = (anecdote) => {
  return async dispatch => {
    // console.log(anecdote)
    const updatedAnecdote = await anecdotesService.upvote(anecdote)
    dispatch(addVote(updatedAnecdote.id))
    dispatch(setNotification(`${updatedAnecdote.content} has been upvoted.`, 10));
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnedcote = await anecdotesService.createNew(content);
    dispatch(createAnecdote(newAnedcote.content));
    // dispatch(createNotification(`${newAnedcote.content} has been added.`, 10));
    // dispatch(createNotification({message: `${newAnedcote.content} has been added.`, duration: 10}));
    dispatch(setNotification(`${newAnedcote.content} has been added.`, 10));

    // setTimeout(() => dispatch(hideNotification()), 5000);
  };
};
export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
