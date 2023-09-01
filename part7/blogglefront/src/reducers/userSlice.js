import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users"
import { manageNotification } from "./notificationSlice";

const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsers: (state, action) =>{
            return action.payload
        }
    }
})


export const {setUsers} = userSlice.actions
export default userSlice.reducer

export const getUsersRequest = () => async (dispatch) => {
    try {
        const result = await userService.getUsers()
        dispatch(setUsers(result))
        return result
    } catch(error){
        dispatch(manageNotification(error.message))
    }

}