import { useAppDispatch } from "../../redux-hooks";
import { updateTaskDescription, toggleTaskDone, toggleTaskEdit, removeTask } from "../../store/tasks-list-slice";
import React, { useState } from "react";
import { ITask, ITaskInputError } from "../../types/types";
import Card from "../ui/card";
import Error from "../ui/error";

interface Props {
    task: ITask,
}

const Task: React.FC<Props> = ({ task: { description, id, isBeingEdited, isDone } }) => {
    const dispatch = useAppDispatch();
    const [descriptionInputValue, setDescriptionInputValue] = useState<string>(description);
    const [descriptionValidationError, setDescriptionValidationError] = useState<ITaskInputError>({ msg: '', id: '', isSet: false, });
    const [descriptionInputWasTouched, setDescriptionInputWasTouched] = useState<boolean>(description.length > 0);

    const descriptionFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateTaskDescription({ id, description: descriptionInputValue }));
    };

    const descriptionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!descriptionInputWasTouched) { setDescriptionInputWasTouched(true); }
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
            setDescriptionValidationError({ isSet: true, msg: 'Description needs to be at least 1 character long', id: 'invalid-input-error' });
        }
        else setDescriptionValidationError({ isSet: false, msg: '', id: '' });
    };

    const onDeleteClickHandler = () => {
        dispatch(removeTask({ id }));
    }

    const generateContent = () => {
        if (!isBeingEdited) return <Card success={isDone}>
            <div>
                <label>Task:</label><p style={isDone ? { textDecorationLine: 'line-through' } : {}}>{description}</p>
                <label htmlFor={`done-checkbox-${id}`}>Done?</label>
                <div>
                    <input id={`done-checkbox-${id}`} type={"checkbox"} checked={isDone} onChange={doneCheckedHandler} />
                    <button onClick={toggleEditHandler}>Edit task</button>
                    <button onClick={onDeleteClickHandler}>Delete</button>
                </div>
            </div>
        </Card>
        else return <Card success={isDone}>
            <div>
                <form name={`task-edit-form-${id}`} onSubmit={descriptionFormSubmitHandler}>
                    <div>
                        <button disabled={descriptionValidationError.isSet || !descriptionInputWasTouched} type="submit">Save</button>
                        <input autoFocus value={descriptionInputValue} aria-label="task-description-input" type="text" placeholder="Enter task description" onChange={e => { descriptionChangeHandler(e) }} />
                        {descriptionValidationError.isSet && <Error errorMsg={descriptionValidationError.msg}/>}
                    </div>
                </form>
                <div>
                    <label htmlFor={`done-checkbox-${id}`}>Done?</label>
                    <input id={`done-checkbox-${id}`} type="checkbox" defaultChecked={isDone} />
                    <button onClick={onDeleteClickHandler}>Delete</button>
                </div>
            </div>
        </Card>
    };

    return <>
        {generateContent()}
    </>
}

export default Task;
