"use client"

import { ResumeSchemaType } from "@/types/resume";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/redux/store";

interface UserData {
    mobile_no: string;
    content_data: ResumeSchemaType;
    template_id: number;
}

const initialState: UserData[] = [];

const AllContentSlice = createSlice({
    name: "all_content",
    initialState,
    reducers: {
        AddContent: (state, action: PayloadAction<UserData>) => {
            const { mobile_no, content_data, template_id } = action.payload;
            const existingUser = state.find(user => user.mobile_no === mobile_no && user.template_id === template_id);

            if (existingUser) {
                existingUser.content_data = content_data;
            } else {
                state.push({ mobile_no, content_data, template_id });
            }
        },
        removeContent: (state, action) => {
            const { mobile_no, template_id } = action.payload;
            return state.filter((curr) => curr.mobile_no != mobile_no && curr.template_id != template_id);
        },
        resetAllContent: () => {
            return initialState;
        },
    },
});

export const selectContentByMobile = (state: RootState, mobileNo: string, template_id: number) =>
    state.AllUserContentReducer.find(user => user.mobile_no === mobileNo && user.template_id == template_id);

export const { AddContent, resetAllContent, removeContent } = AllContentSlice.actions;
export default AllContentSlice.reducer;
