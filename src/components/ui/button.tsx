import React from "react"

const Button:React.FC<{
    onClickHandler:() => void,
    label: string,
}> = ({onClickHandler, label}) => {
    return <button onClick={onClickHandler}>
        {label}
    </button>
}

export default Button;
