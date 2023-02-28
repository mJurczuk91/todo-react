import React from "react"

const Button:React.FC<{
    onClickHandler:() => void,
    name: string,
}> = ({onClickHandler, name}) => {
    return <button onClick={onClickHandler}>
        {name}
    </button>
}

export default Button;
