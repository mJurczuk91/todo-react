import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import React, { ReactNode } from "react";
import { ITask } from "../../types";
import Card from "../ui/card";

interface Props {
    task: ITask,
}

const Task: React.FC<Props> = ({ task: { description, id, isBeingEdited, isDone } }) => {

    const generateContent = () => {
        if (!isBeingEdited) return <Card>
            <div>
                <p>Task: {description}</p>
                <input type={"checkbox"} checked={isDone} />
            </div>
        </Card>
        else {
            return <Card>
                <form name={`form task ${id}`} >
                    <input type="text" placeholder="Enter task description" />
                    <input type="checkbox" defaultChecked={isDone} />
                </form>
            </Card>
        }
    }

    return <div>
        {generateContent()}
    </div>
}

export default Task;
