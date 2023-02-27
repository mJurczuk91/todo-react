import { configureStore } from "@reduxjs/toolkit";
import {default as tasksList} from './tasks-list-slice'

const store = configureStore({
    reducer: {
        tasksList,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch