import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e",
    selectedId: { idFor: "", id: "" },
    drawerContent: "",
    isDrawerOpen: false,
    refetch: null,
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
        },
        setDraweContent: (state, action) => {
            state.drawerContent = action.payload;
        },
        setIsDrawerOpen: (state, action) => {
            state.isDrawerOpen = action.payload;
        },

    },
});

export const { setMode, setId, setDraweContent, setIsDrawerOpen } = globalSlice.actions;

export default globalSlice.reducer;
