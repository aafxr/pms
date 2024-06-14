import {User} from "../../core/classes/employee/User";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UserSliceStateType = {
    user: User | null
    loading: boolean
}

const initialState: UserSliceStateType = {
    user: null,
    loading: false
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UserSliceStateType, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        resetUser: (state: UserSliceStateType) => {
            state.user = null;
        }

    }
})

export const {setUser, resetUser} = userSlice.actions
export const userReducer = userSlice.reducer