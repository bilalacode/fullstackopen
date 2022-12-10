import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (newPerson) =>
  axios.post(baseUrl, newPerson).then((res) => res.data);

const update = (id, newPerson) =>
  axios.put(`${baseUrl}/${id}`, newPerson).then((res) => {
    return res.data;
  });

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => console.log(response));

const personService = {
  getAll,
  create,
  update,
  remove,
};

export default personService;
