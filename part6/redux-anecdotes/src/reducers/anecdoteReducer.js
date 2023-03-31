import { createSlice, current } from "@reduxjs/toolkit";
import anecdotesService from "../components/services/anecdotes";
import { setNotification } from "../reducers/notificationReducer";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

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
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.upvote(anecdote);
    dispatch(addVote(updatedAnecdote.id));
    dispatch(
      setNotification(`${updatedAnecdote.content} has been upvoted.`, 10)
    );
  };
};

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnedcote = await anecdotesService.createNew(content);
    dispatch(createAnecdote(newAnedcote.content));
    dispatch(setNotification(`${newAnedcote.content} has been added.`, 10));
  };
};
export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
