"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState: { template_id: number } = { template_id: -1 };

const CurrTemplateSlice = createSlice({
    name: "curr_template",
    initialState,
    reducers: {
        selectCurrTemplate: (state, action) => {
            return action.payload;
        },
        resetCurrTemplate: (state) => {
            return initialState;
        },
    },
});

export const { selectCurrTemplate, resetCurrTemplate } = CurrTemplateSlice.actions;
export default CurrTemplateSlice.reducer;
