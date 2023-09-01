import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { manageNotification } from "./notificationSlice";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    setSingleBlog: (state, action) => {
      const updatedBlogs = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
      return updatedBlogs;
    },
    addABlog: (state, action) => {
      return state.concat(action.payload);
    },
  },
});

export const { setBlogs, setSingleBlog, addABlog } = blogSlice.actions;
export default blogSlice.reducer;

export const fetchBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  } catch (error) {
    dispatch(manageNotification(error.message));
  }
};

export const fetchSingleBlog = (id) => async (dispatch) => {
  try {
    const blog = await blogService.getById(id);
    dispatch(setSingleBlog(blog));
  } catch (error) {
    dispatch(manageNotification(error.message));
  }
};

export const postABlog = (title, content) => async (dispatch) => {
  try {
    const blog = { title, content };
    const token = await JSON.parse(window.localStorage.getItem("userData"))
      .token;
    const result = await blogService.createBlog(blog, token);
    dispatch(addABlog(result));
    return result;
  } catch (error) {
    dispatch(manageNotification(error.message));
  }
};

export const toggleLike = (id) => async (dispatch) => {
  try {
    const token = await JSON.parse(window.localStorage.getItem("userData"))
      .token;
    const updatedBlog = await blogService.toggleLike(id, token);
    dispatch(setSingleBlog(updatedBlog));
  } catch (error) {
    dispatch(manageNotification("Unable to like. Please login :)"));
  }
};

export const addComment = (content, id) => async (dispatch) => {
  try {
    const token = await JSON.parse(window.localStorage.getItem("userData"))
      .token;

    const updatedBlog = await blogService.addComment({ content, id }, token);
    await dispatch(setSingleBlog(updatedBlog));
  } catch (error) {
    dispatch(manageNotification("Unable to comment."));
  }
};
