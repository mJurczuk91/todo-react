import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ITaskSearchValue {
    value: string,
}

const initialState:ITaskSearchValue = {
    value: '',
}

const HeaderSearchSlice = createSlice({
    name: 'headerSearch',
    initialState,
    reducers: {
        SetSearchValue(state, action:PayloadAction<ITaskSearchValue>){
            state.value = action.payload.value;
        },
    }
})

export const { SetSearchValue } = HeaderSearchSlice.actions;
export const selectHeaderSearch = (state: RootState) => state.headerSearch.value;
export default HeaderSearchSlice.reducer;