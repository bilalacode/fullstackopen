import axios from "axios";

const URL = "/api/blogs";

const tokenSet = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const getAll = async () => {
  try {
    const result = await axios.get(`${URL}`);
    return result.data;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const result = await axios.get(`${URL}/${id}`);
    return result.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
};

const createBlog = async (blog, token) => {
  const { title, content } = blog;
  try {
    const result = await axios.post(URL, { title, content }, tokenSet(token));
    return result.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

const toggleLike = async (id, token) => {
  try {
    const result = await axios.put(`${URL}/${id}/like`, null, tokenSet(token));
    return result.data;
  } catch (error) {
    console.error(`Error toggling like for blog with ID ${id}:`, error);
    throw error;
  }
};

const addComment = async (comment, token) => {
  try {
    const { content, id } = comment;
    const result = await axios.post(
      `${URL}/${id}/comments`,
      { content },
      tokenSet(token)
    );
    return result.data;
  } catch (error) {
    console.error(`Error adding a comment`, error);
    throw error;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getById,
  createBlog,
  toggleLike,
  addComment,
};
