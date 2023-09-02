import { createSlice, createAsyncThunk, Dispatch, AnyAction } from "@reduxjs/toolkit";
import axios from "../../config/axios";

const initialValue = {
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers:{},
})

export const {} = userSlice.actions;
export default userSlice.reducer;