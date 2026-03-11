"use client"
import { createSlice } from "@reduxjs/toolkit"

const initialState: { mobile_no: string }[] = [];

const CurrLoginSlice = createSlice({
    name: "curr_login",
    initialState,
    reducers: {
        selectCurrLogin: (state, action) => {
            if (!Array.isArray(state)) {
                return [action.payload];
            }
            const exists = state.find(user => user.mobile_no == action.payload.mobile_no);
            if (!exists) {
                state.push(action.payload);
            }
        },
        resetCurrLogin: (state) => {
            return initialState;
        }
    },
});

export const { selectCurrLogin, resetCurrLogin } = CurrLoginSlice.actions;
export default CurrLoginSlice.reducer;
