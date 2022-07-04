import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface tocState {
    items: any[],
    tocHtml: string
}

const initialState: tocState = {
    items: [],
    tocHtml: ""
}

export const tocSlice = createSlice({
    name: 'toc',
    initialState,
    reducers: {
        setTOC: (state, action: PayloadAction<any[]>) => {
            state.items = action.payload
        },
        setTOCHtml: (state, action: PayloadAction<string>) => {
            state.tocHtml = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setTOC, setTOCHtml } = tocSlice.actions
export const tocActions = tocSlice.actions;
export default tocSlice.reducer