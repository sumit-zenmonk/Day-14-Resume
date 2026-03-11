"use client"

import initialData from "../../../../dummy_content.json"
import { ResumeSchemaType } from "@/types/resume";
import { createSlice } from "@reduxjs/toolkit"

const initialState: { mobile_no: string } = { mobile_no: "" };

const CurrLoginSlice = createSlice({
    name: "curr_login",
    initialState,
    reducers: {
        selectCurrLogin: (state, action) => {
            state.mobile_no = action.payload.mobile_no;
        },
        resetCurrLogin: (state) => {
            return initialState;
        },
    },
});

export const { selectCurrLogin, resetCurrLogin } = CurrLoginSlice.actions;
export default CurrLoginSlice.reducer;
