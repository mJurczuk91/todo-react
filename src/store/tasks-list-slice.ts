import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ITask } from "../types/types";

export interface ITasksList {
    value: ITask[],
    id: number,
}

const initialState: ITasksList = {
    value: [],
    id: 0,
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
        removeTask(state, action:PayloadAction<{id: number}>){
            state.value = state.value.filter(item => { return (
                item.id !== action.payload.id
            )});
        },
        updateTaskDescription(state, action: PayloadAction<{id: number, description: string}>){
            state.value = state.value.map((task) => {
                return task.id === action.payload.id ? {...task, description: action.payload.description, isBeingEdited: false} : task
            });
        },
        toggleTaskDone(state, action:PayloadAction<{id: number}>){
            state.value = state.value.map((task) => {
                return task.id === action.payload.id ? {...task, isDone: !task.isDone} : task;
            });
        },
        toggleTaskEdit(state, action:PayloadAction<{id: number}>){
            state.value = state.value.map((task) => {
                return task.id === action.payload.id ? {...task, isBeingEdited: !task.isBeingEdited} : task;
            });
        },
    }
})

export const {createTask, removeTask, updateTaskDescription, toggleTaskDone, toggleTaskEdit} = TasksListSlice.actions;
export const selectTaskList = (state: RootState) => state.tasksList.value;
export default TasksListSlice.reducer;

