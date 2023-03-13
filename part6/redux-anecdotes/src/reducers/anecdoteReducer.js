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

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  // console.log('action', action)

  // return state

  switch (action.type) {
    case "NEW_VOTE":
      const id = action.payload.id;
      const voteToAdd = state.find((n) => n.id === id);
      const votes = voteToAdd.votes;
      const addedVote = {
        ...voteToAdd,
        votes: votes + 1,
      };
      return state.map((annecdote) =>
        annecdote.id !== id ? annecdote : addedVote
      );
    case "NEW_ANECDOTE":
      return [...state, action.payload]

    default:
      return state;
  }
};

export const anecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content: content,
      votes: 0,
      id: getId(),
    },
  };
};
export const vote = (id) => {
  return {
    type: "NEW_VOTE",
    payload: { id },
  };
};

export default reducer;
