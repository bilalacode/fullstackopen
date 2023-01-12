import axios from "axios";
const baseUrl = "/api/persons";

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

const remove = (id, name) =>
  axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response)
  

const personService = {
  getAll,
  create,
  update,
  remove,
};

export default personService;
