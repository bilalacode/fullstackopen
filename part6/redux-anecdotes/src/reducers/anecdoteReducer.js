import { createSlice, current } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    createAnecdote(state, action){
      console.log(initialState, "initial state")
      console.log(action.payload, "payload")
      console.log(current(state), "state")
      const newAnecdote = asObject(action.payload)
      return [...state, newAnecdote]

    },
    addVote(state, action){
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
    }
  }
})

export const {createAnecdote, addVote} = anecdoteSlice.actions
export default anecdoteSlice.reducer

// const anecdoteReducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);

//   // console.log('action', action)

//   // return state

//   switch (action.type) {
//     case "NEW_VOTE":
//       const id = action.payload.id;
//       const voteToAdd = state.find((n) => n.id === id);
//       const votes = voteToAdd.votes;
//       const addedVote = {
//         ...voteToAdd,
//         votes: votes + 1,
//       };
//       return state.map((annecdote) =>
//         annecdote.id !== id ? annecdote : addedVote
//       );
//     case "NEW_ANECDOTE":
//       return [...state, action.payload]

//     default:
//       return state;
//   }
// };

// const anecdoteSlice = createSlice({
//   name: "anecdote",
//   initialState,
//   reducers: {
//       vote (state, action){
//         const id = action.payload.id;
//         const voteToAdd = state.find((n) => n.id === id);
//         const votes = voteToAdd.votes;
//         const addedVote = {
//         ...voteToAdd,
//         votes: votes + 1,
//       };

//       return state.map((annecdote) =>
//         annecdote.id !== id ? annecdote : addedVote
// )
//       },

//       anecdote(state, action){
//         return state.push(action.payload)
//       }
//   }
// })

// export const anecdote = (content) => {
//   return {
//     type: "NEW_ANECDOTE",
//     payload: {
//       content: content,
//       votes: 0,
//       id: getId(),
//     },
//   };
// };
// export const vote = (id) => {
//   return {
//     type: "NEW_VOTE",
//     payload: { id },
//   };
// };

// export const {vote, anecdote} = anecdoteSlice.actions
// export default anecdoteSlice.reducer;
