import { useAppDispatch } from "../../redux-hooks";
import IError from "../errors/IError";
import { updateTaskDescription, toggleTaskDone, toggleTaskEdit } from "../../store/tasks-list-slice";
import React, { useState } from "react";
import { ITask } from "../../types";
import Card from "../ui/card";
import Error from "../ui/error";

interface Props {
    task: ITask,
}

const Task: React.FC<Props> = ({ task: { description, id, isBeingEdited, isDone } }) => {
    const dispatch = useAppDispatch();
    const [descriptionInputValue, setDescriptionInputValue] = useState<string>(description);
    const [descriptionValidationError, setDescriptionValidationError] = useState<IError>({errorMsg: '', id: '', isSet: false, });
    const [descriptionInputWasTouched, setDescriptionInputWasTouched] = useState<boolean>(description.length > 0);

    const descriptionFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateTaskDescription({ id, description: descriptionInputValue }));
    };

    const descriptionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!descriptionInputWasTouched) {setDescriptionInputWasTouched(true);}
        setDescriptionInputValue(e.target.value);
        validateTaskDescription(e.target.value);
    };

    const doneCheckedHandler = () => {
        dispatch(toggleTaskDone({ id }));
    };

    const toggleEditHandler = () => {
        dispatch(toggleTaskEdit({ id }));
    };

    const validateTaskDescription = (description: string) => {
        if (description.length < 1) {
            setDescriptionValidationError({ isSet: true, errorMsg: 'Description needs to be at least 1 character long', id:'invalid-input-error' });
        }
        else setDescriptionValidationError({ isSet: false, errorMsg: '', id: '' });
    };



    const generateContent = () => {
        if (!isBeingEdited) return <Card>
            <div>
                <label>Task:</label><p style={isDone ? { textDecorationLine: 'line-through' } : {}}>{description}</p>
                <label htmlFor={`done-checkbox-${id}`}>Done?</label>
                <input id={`done-checkbox-${id}`} type={"checkbox"} checked={isDone} onChange={doneCheckedHandler} />
                <button onClick={toggleEditHandler}>Edit task</button>
            </div>
        </Card>
        else return <Card>
            <div>
                <form name={`task-edit-form-${id}`} onSubmit={descriptionFormSubmitHandler}>
                    <div>
                        <button disabled={descriptionValidationError.isSet || !descriptionInputWasTouched} type="submit">Save</button>
                        <input value={descriptionInputValue} aria-label="task-description-input" type="text" placeholder="Enter task description" onChange={e => { descriptionChangeHandler(e) }} />
                    </div>
                    {descriptionValidationError.isSet && <Error error={descriptionValidationError} />}
                </form>
                <label htmlFor={`done-checkbox-${id}`}>Done?</label>
                <input id={`done-checkbox-${id}`} type="checkbox" defaultChecked={isDone} />
            </div>
        </Card>
    };

    return <div>
        {generateContent()}
    </div>
}

export default Task;
