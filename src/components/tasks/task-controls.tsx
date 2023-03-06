import classes from './task-controls.module.scss';

type Props = {
    isBeingEdited: boolean,
    isDone: boolean,
    doneClickHandler: ()=>void,
    editClickHandler: ()=>void,
    deleteClickHandler: ()=>void,
}
//isBeingEdited, isDone, doneCheckedHandler, onEditHandler, onDeleteClickHandler
const TaskControls:React.FC<Props> = ({isBeingEdited, isDone, doneClickHandler, editClickHandler, deleteClickHandler}:Props) => {
    return <div>
        <label htmlFor={`done-checkbox`}>Done?</label>
        <input id={`done-checkbox`} type={"checkbox"} checked={isDone} onChange={doneClickHandler} />
        <button disabled={isBeingEdited} onClick={editClickHandler}>Edit task</button>
        <button onClick={deleteClickHandler}>Delete</button>
    </div>
}

export default TaskControls;