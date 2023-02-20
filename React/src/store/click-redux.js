import { createSlice } from '@reduxjs/toolkit';

const initialClick={
    isClicked:false,
    username:""
};

const clickSlice= createSlice({
    name:'click',
    initialState:initialClick,
    reducers:{
        hide(state){
            state.isClicked=true;
        },
        showDati(state,action){
            state.username=action.payload
        },
        show(state){
            state.isClicked=false;

        }
    }
});

export const clickAction=clickSlice.actions;

export default clickSlice.reducer;