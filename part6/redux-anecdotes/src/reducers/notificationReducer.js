import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "example",
    show: true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
        state.message = action.payload;
        state.show = true;
    },
    hideNotification(state, action) {
        state.show = false;
    }
  }
});

export const { createNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;