import { useAppDispatch } from "../../redux-hooks";
import { SetSearchValue } from "../../store/header-search-slice";
import { createTask } from "../../store/tasks-list-slice";
import classes from './header.module.scss';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetSearchValue({ value: e.target.value }));
    }

    return <header className={classes.header}>
        <h1 className={classes.logo}>Todo</h1>
        <div className={classes.searchBar}>
        <label htmlFor="find-tasks">Find tasks</label>
        <input id="find-tasks" type={'text'} onChange={inputChangeHandler} />  
        <button className={classes.button} onClick={() => { dispatch(createTask()) }}>Add tasks!</button>
        </div>
        
        
        

    </header>
}

export default Header;