import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ITask } from "../types";

type TasksList = {
    value: ITask[],
    id: number,
}

const initialState: TasksList = {
    value: [],
    id: 1,
}

const TasksListSlice = createSlice({
    name: 'tasksList',
    initialState,
    reducers: {
        createTask(state){
            let task: ITask = {
                description: '',
                isDone: false,
                isBeingEdited: true,
                id: state.id,
            }
            state.id++;
            state.value = state.value.concat(task);
        },
        removeTask(state, action:PayloadAction<ITask>){
            state.value.filter(item => { return (
                item.id !== action.payload.id
            )});
        },
    }
})

export const {createTask, removeTask} = TasksListSlice.actions;
export const selectTaskList = (state: RootState) => state.tasksList.value;
export default TasksListSlice.reducer;
