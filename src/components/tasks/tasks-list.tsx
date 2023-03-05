import React from "react";
import Card from "../ui/card";
import Task from "./task";
import {  useAppSelector } from "../../redux-hooks";
import { selectTaskList } from "../../store/tasks-list-slice";
import { selectHeaderSearch } from "../../store/header-search-slice";



const TasksList: React.FC = () => {
    const taskList = useAppSelector(selectTaskList); 
    const searchValue = useAppSelector(selectHeaderSearch);
    
    const generateList = () => {
        if(taskList.length === 0){
            return <Card><p>No tasks yet...</p></Card>;
        } else {
            return taskList.filter(task => { return task.description.includes(searchValue) || task.isBeingEdited} ).map(task => <Task key={task.id} task={task} />)
        }
    }

    return <>
        {generateList()}
    </>
}

export default TasksList;
