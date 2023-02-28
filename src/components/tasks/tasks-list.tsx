import React from "react";
import Card from "../ui/card";
import Task from "./task";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { selectTaskList } from "../../store/tasks-list-slice";
import { createTask } from "../../store/tasks-list-slice";



const TasksList: React.FC = () => {
    const taskList = useAppSelector(selectTaskList); 
    const tasksListDispatch = useAppDispatch();

    const addTaskButtonClicked = () => {
        tasksListDispatch(createTask());
    }
    
    const generateList = () => {
        if(taskList.length === 0){
            return <Card><p>No tasks yet...</p></Card>;
        } else {
            return taskList.map(task => <Task key={task.id} task={task} />)
        }
    }

    return <>
        {generateList()}
        <button onClick={addTaskButtonClicked}>Add tasks!</button>
    </>
}

export default TasksList;
