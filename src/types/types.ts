export interface ITask {
    description: string,
    isDone: boolean,
    isBeingEdited: boolean,
    id: number,
}

export interface ITaskInputError {
    msg: string,
    id: string,
    isSet: boolean,
};