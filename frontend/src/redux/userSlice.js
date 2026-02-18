import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{
        setUserData:(state, action)=>{
            state.userData=action.payload
        },
        updateCredit:(state, action)=>{
            if(state.userData){
                state.userData.credit=action.payload
            }
        }
    }
})

export const {setUserData, updateCredit}=userSlice.actions

export default userSlice.reducer