import { useState } from "react";
import { useAppDispatch } from "../../redux-hooks";
import { ITask, ITaskInputError } from "../../types/types"
import { updateTaskDescription } from "../../store/tasks-list-slice";
import Error from "../ui/error";

import classes from "./task-edit-form.module.scss";

interface Props {
    task: ITask,
}

const TaskEditForm: React.FC<Props> = ({ task: { description, id } }) => {
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

    const validateTaskDescription = (description: string) => {
        if (description.length < 1) {
            setDescriptionValidationError({ isSet: true, msg: 'Description needs to be at least 1 character long', id: 'invalid-input-error' });
        }
        else setDescriptionValidationError({ isSet: false, msg: '', id: '' });
    };

    return <form name={`task-edit-form-${id}`} onSubmit={descriptionFormSubmitHandler}>
        <div>
            <button disabled={descriptionValidationError.isSet || !descriptionInputWasTouched} type="submit">Save</button>
            <input autoFocus value={descriptionInputValue} aria-label="task-description-input" type="text" placeholder="Enter task description" onChange={e => { descriptionChangeHandler(e) }} />
            {descriptionValidationError.isSet && <Error errorMsg={descriptionValidationError.msg} />}
        </div>
    </form>
}

export default TaskEditForm;