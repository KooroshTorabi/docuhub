import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface tocState {
    content: string,
    currentUrl: string;
}

const initialState: tocState = {
    content: "",
    currentUrl: ""
}

export const bodySlice = createSlice({
    name: 'toc',
    initialState,
    reducers: {
        setContent: (state, action: PayloadAction<string>) => {
            state.content = action.payload
        },
        setCurrentUrl: (state, action: PayloadAction<string>) => {
            state.currentUrl = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setContent, setCurrentUrl } = bodySlice.actions
export const bodyActions = bodySlice.actions;
export default bodySlice.reducer