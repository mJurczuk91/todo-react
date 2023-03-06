import { useAppDispatch } from "../../redux-hooks";
import { toggleTaskDone, toggleTaskEdit, removeTask } from "../../store/tasks-list-slice";
import React, { useState } from "react";
import { ITask, ITaskInputError } from "../../types/types";
import Card from "../ui/card";
import Error from "../ui/error";
import TaskEditForm from "./task-edit-form";

import classes from "./task.module.scss";
import TaskControls from "./task-controls";

interface Props {
    task: ITask,
}

const Task: React.FC<Props> = ({ task: { id, description, isBeingEdited, isDone } }) => {
    const dispatch = useAppDispatch();

    const doneClickHandler = () => {
        dispatch(toggleTaskDone({ id }));
    };

    const editClickHandler = () => {
        dispatch(toggleTaskEdit({ id }));
    }; 

    const deleteClickHandler = () => {
        dispatch(removeTask({ id }));
    }
    
    return <>
        <Card success={isDone}>
            <div className={classes.container}>
                {isBeingEdited ? <TaskEditForm task={{id, description, isBeingEdited, isDone}} />
                               : <p style={isDone ? { textDecorationLine: 'line-through' } : {}}>{description}</p>}
                <TaskControls 
                    isBeingEdited={isBeingEdited} 
                    isDone={isDone} 
                    doneClickHandler={doneClickHandler} 
                    editClickHandler={editClickHandler} 
                    deleteClickHandler={deleteClickHandler} 
                />
            </div>
        </Card>
    </>
}

export default Task;
