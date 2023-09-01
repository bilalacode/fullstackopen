import axios from "axios";

const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.error
        ? error.response.data.error
        : "Unexpected error";
    throw new Error(errorMessage);
  }
};


// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
