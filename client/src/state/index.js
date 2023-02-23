import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e",
    selectedId: { idFor: "", id: "" }
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setId: (state, action) => {
            state.selectedId = action.payload;

            console.log(state.selectedId);
        }
    },
});

export const { setMode, setId } = globalSlice.actions;

export default globalSlice.reducer;
