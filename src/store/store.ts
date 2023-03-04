import { configureStore } from "@reduxjs/toolkit";
import {default as tasksList} from './tasks-list-slice'
import {default as headerSearch} from './header-search-slice';

const store = configureStore({
    reducer: {
        tasksList,
        headerSearch,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch