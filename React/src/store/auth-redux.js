import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    isLogged: false
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login(state,action) {
            state.isLogged = true;    
            state.username = action.payload;
            localStorage.setItem('username', state.username)
        },
        logout(state){
            state.isLogged=false;
            localStorage.removeItem('username')

        }
    }
});

export const authAction = authSlice.actions;
export default authSlice.reducer;



