import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = () =>
  axios
    .get(baseUrl)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
export const postAnecdote = (anecdote) =>
  axios
    .post(baseUrl, anecdote)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
export const updateAnecdote = (anecdote) =>
  axios
    .put(`${baseUrl}/${anecdote.id}`, anecdote)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
