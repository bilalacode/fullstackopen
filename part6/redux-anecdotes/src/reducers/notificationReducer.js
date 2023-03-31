import { createSlice } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";

const initialState = {
  message: "",
  show: false,
};
// const dispatch = useDispatch()
// const hideNotifications = () => ({ type: "notification/hideNotification" });



const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      console.log(action.payload)
      state.message = action.payload;
      state.show = true;

    },
    hideNotification(state, action) {
      state.show = false;
    },
  },
});

export const setNotification = (text, duration) => {
  return dispatch => {
    dispatch(createNotification(text))
    setTimeout(() => dispatch(hideNotification()), duration * 1000);
  }
}

export const { createNotification, hideNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
