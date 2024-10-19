import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    status:false,
    userData:undefined
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload;
            localStorage.setItem("userData",JSON.stringify(action.payload));
        },
        logout:(state,action)=>{
            state.status = false;
            state.userData = undefined;
            localStorage.removeItem('userData');
            console.log("Logging out inside the userSlice");
        }
    }
})

export const {login,logout} = userSlice.actions;
export default userSlice.reducer;