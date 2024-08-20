import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
    name: string;
    email: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};


type TAuthState = {
    user: null | TUser;
};


const initialState: TAuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.data;
            console.log("Action payload from auth slice =>", action.payload)
        }
    }
});


export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;