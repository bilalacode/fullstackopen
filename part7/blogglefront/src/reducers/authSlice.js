import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { manageNotification } from "./notificationSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },

  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state, action) => {
      state.isLoggedIn = false;
      state.user = false;
      state.token = false;
    },
  },
});

export default authSlice.reducer;
export const { loginUser, logoutUser } = authSlice.actions;

export const manageUserLogin = (credentials) => async (dispatch) => {
  try {
    const response = await loginService.login(credentials);
    dispatch(
      loginUser({
        user: response.user,
        token: response.token,
      })
    );
    localStorage.setItem("userData", JSON.stringify(response));
    dispatch(manageNotification("Login Success :)"));
  } catch (error) {
    dispatch(manageNotification(error.message));
  }
};

export const manageUserLogout = () => (dispatch) => {
  dispatch(logoutUser());
  localStorage.removeItem("userData");
};
