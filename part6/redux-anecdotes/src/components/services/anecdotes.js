import axios from "axios";

const URL = "http://localhost:3001/anecdotes";
const getAll = async () => {
  const response = await axios.get(URL);
  return response.data;
};

const createNew = async (data) => {
  const content = { content: data, votes: 0 };
  const response = await axios.post(URL, content);
  return response.data;
};

const upvote = async (anecdote) => {
  const newVote = anecdote.votes + 1;
  const response = await axios.put(`${URL}/${anecdote.id}`, {...anecdote, votes: newVote });
  console.log(response)
  return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, upvote };
