import { useAppDispatch } from "../../redux-hooks";
import { updateTaskDescription } from "../../store/tasks-list-slice";
import React, { ReactNode, useState } from "react";
import { ITask } from "../../types";
import Card from "../ui/card";

interface Props {
    task: ITask,
}

const Task: React.FC<Props> = ({ task: { description, id, isBeingEdited, isDone } }) => {
    const dispatch = useAppDispatch();
    const [descriptionInputValue, setDescriptionInputValue] = useState<string>(description);

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateTaskDescription({ id, description: descriptionInputValue }));
    }

    const descriptionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionInputValue(e.target.value);
    }

    const generateContent = () => {
        if (!isBeingEdited) return <Card>
            <div>
                <label>Task:</label><p>{description}</p>
                <label htmlFor="done-checkbox">Done?</label>
                <input type={"checkbox"} defaultChecked={isDone} />
            </div>
        </Card>
        else return <Card>
            <div>
                <form name={`form task ${id}`} onSubmit={formSubmitHandler}>
                    <input type="submit" value="Save" />
                    <input value={descriptionInputValue} name="task-description" type="text" placeholder="Enter task description" onChange={e => { descriptionChangeHandler(e) }} />
                </form>
                <label htmlFor="done-checkbox">Done?</label>
                <input name="done-checkbox" type="checkbox" defaultChecked={isDone} />
            </div>
        </Card>
    }

    return <div>
        {generateContent()}
    </div>
}

export default Task;
