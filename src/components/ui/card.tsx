import React from 'react';
import classes from './card.module.scss';

type Props = {
    children: React.ReactNode,
    err?: boolean,
    success?: boolean
}

const Card: React.FC<Props> = ({ children, err = false, success = false }) => {
    const getStyle = () => {
        return success ? classes.cardSuccess :
                   err ? classes.cardError :
                         classes.card
    }

    return <div className={getStyle()}>
        <div>
            {children}
        </div>
    </div>
}

export default Card;