import { ITaskInputError } from "../../types/types";

const Error:React.FC<{error: ITaskInputError}> = ({error: {id, errorMsg}}) => {
    return <div>
        <p>{errorMsg}</p>
    </div>
}

export default Error;
