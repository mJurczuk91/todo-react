import { ReactNode } from "react";
import classes from './error.module.scss';

const Error:React.FC<{children?: ReactNode, errorMsg: string}> = ({errorMsg}) => { 
    
    return <p className={classes.error}>
        !{" " + errorMsg}
    </p>
}

export default Error;