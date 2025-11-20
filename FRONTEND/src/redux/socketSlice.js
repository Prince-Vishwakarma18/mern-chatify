import { createSlice } from "@reduxjs/toolkit";
const socketSlcie = createSlice({
    name:"socket",
    initialState:{
        socket:null,
    },
    reducers:{
        setSocket:(state,action)=>{
            state.socket= action.payload;

        }
    }
})
export const {setSocket} = socketSlcie.actions;
export default socketSlcie.reducer;