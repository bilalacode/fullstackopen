import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  show: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      console.log(action.payload);
      state.message = action.payload;
      state.show = true;
    },
    hideNotification(state, action) {
      state.show = false;
    },
  },
});

export const setNotification = (text, duration) => {
  return (dispatch) => {
    dispatch(createNotification(text));
    setTimeout(() => dispatch(hideNotification()), duration * 1000);
  };
};

export const { createNotification, hideNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
