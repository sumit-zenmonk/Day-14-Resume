"use client"

import { createSlice } from "@reduxjs/toolkit"
import { AllUserState } from "./allUserType";

const initialState: AllUserState[] = [];

const AllSignupSlice = createSlice({
    name: "all_Signup_users",
    initialState,
    reducers: {
        AllSignup: (state, action) => {
            const exists = state.find(mob => mob.mobile_no === action.payload.mobile_no);
            if (!exists) {
                state.push(action.payload);
            }
        },
        ResetAllSignup: (state) => {
            return initialState
        }
    },
});

export const { AllSignup, ResetAllSignup } = AllSignupSlice.actions;
export default AllSignupSlice.reducer