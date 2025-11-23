import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        debugMode: false,
    },
    reducers: {
        toggleDebug: (state) => {
            state.debugMode = !state.debugMode
        },
    },
})

export const { toggleDebug } = uiSlice.actions
export default uiSlice.reducer
