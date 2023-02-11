import axios from "axios";
const baseUrl = "/api/blogs";

let config = {};

const setToken = (recToken) => {
  config = {
    headers: { Authorization: `Bearer ${recToken}` },
  };
};

const getAll = async () => {
  const res = await axios.get(baseUrl, config);
  // console.log(res.data);
  return res.data;
};

const postABlog = async (blog) => {
  
  const res = await axios.post(baseUrl, blog, config);
  console.log(res.data)
  return res.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, postABlog };
