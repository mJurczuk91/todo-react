import IError from "../errors/IError";

const Error:React.FC<{error: IError}> = ({error: {id, errorMsg}}) => {
    return <div id={id}>
        <p>{errorMsg}</p>
    </div>
}

export default Error;
