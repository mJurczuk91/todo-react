import { useAppDispatch } from "../../redux-hooks";
import { updateTaskDescription, toggleTaskDone, toggleTaskEdit } from "../../store/tasks-list-slice";
import React, { ReactNode, useState } from "react";
import { ITask } from "../../types";
import Card from "../ui/card";

interface Props {
    task: ITask,
}

const Task: React.FC<Props> = ({ task: { description, id, isBeingEdited, isDone } }) => {
    const dispatch = useAppDispatch();
    const [descriptionInputValue, setDescriptionInputValue] = useState<string>(description);
    const [descriptionValidationError, setDescriptionValidationError] = useState<{isSet: boolean, value: string | null}>({isSet: false, value: null});
    const [descriptionInputWasTouched, setDescriptionInputWasTouched] = useState<boolean>(false);

    const descriptionFormSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateTaskDescription({ id, description: descriptionInputValue }));
    }

    const descriptionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!descriptionInputWasTouched) setDescriptionInputWasTouched(true);
        const description = e.target.value.trim();
        setDescriptionInputValue(description);
        validateTaskDescription(description);
    }

    const doneCheckedHandler = () => {
        dispatch(toggleTaskDone({id}));
    }

    const toggleEditHandler = () => {
        dispatch(toggleTaskEdit({id}));
    }

    const validateTaskDescription = (description: string) => {
        if(description.length < 1){
            setDescriptionValidationError({isSet: true, value: 'Description needs to be at least 1 character long'});
        }
        else setDescriptionValidationError({isSet: false, value: null});
    }

    const generateContent = () => {
        console.log(`generate content for id ${id} was evaluated`);
        if (!isBeingEdited) return <Card>
            <div>
                <label>Task:</label><p style={isDone ? {textDecorationLine: 'line-through'} : {}}>{description}</p>
                <label htmlFor={`done-checkbox-${id}`}>Done?</label>
                <input id={`done-checkbox-${id}`} type={"checkbox"} checked={isDone} onChange={doneCheckedHandler} />
                <button onClick={toggleEditHandler}>Edit task</button>
            </div>
        </Card>
        else return <Card>
            <div>
                <form name={`task-edit-form-${id}`} onSubmit={descriptionFormSubmitHandler}>
                    <button disabled={descriptionValidationError.isSet || !descriptionInputWasTouched} type="submit">Save</button>
                    <input value={descriptionInputValue} aria-label="task-description-input" type="text" placeholder="Enter task description" onChange={e => { descriptionChangeHandler(e) }} />
                </form>
                <label htmlFor={`done-checkbox-${id}`}>Done?</label>
                <input id={`done-checkbox-${id}`} type="checkbox" defaultChecked={isDone} />
            </div>
        </Card>
    }

    return <div>
        {generateContent()}
    </div>
}

export default Task;
