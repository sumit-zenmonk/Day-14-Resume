"use client"

import { ResumeSchemaType } from "@/types/resume";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/redux/store";

interface UserData {
    mobile_no: string;
    content_data: ResumeSchemaType;
}

const initialState: UserData[] = [];

const AllContentSlice = createSlice({
    name: "all_content",
    initialState,
    reducers: {
        AddContent: (state, action: PayloadAction<UserData>) => {
            const { mobile_no, content_data } = action.payload;
            const existingUser = state.find(user => user.mobile_no === mobile_no);

            if (existingUser) {
                existingUser.content_data = content_data;
            } else {
                state.push({ mobile_no, content_data });
            }
        },
        resetAllContent: () => {
            return initialState;
        },
    },
});

export const selectContentByMobile = (state: RootState, mobileNo: string) =>
    state.AllUserContentReducer.find(user => user.mobile_no === mobileNo);

export const { AddContent, resetAllContent } = AllContentSlice.actions;
export default AllContentSlice.reducer;
