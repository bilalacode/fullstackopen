import axios from "axios";
const URL = "/api/users";

const getUsers = async () => {
  try {
    const result = await axios.get(URL);
    return result.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const signUpUser = async (userDetails) => {
  try {
    const { username, name, password } = userDetails;
    const result = await axios.post(URL, { username, name, password });
    return result.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getUsers, signUpUser };
