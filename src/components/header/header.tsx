import { useAppDispatch } from "../../redux-hooks";
import { SetSearchValue } from "../../store/header-search-slice";

const Header:React.FC = () => { 
    const dispatch = useAppDispatch();

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => { 
        dispatch(SetSearchValue({value: e.target.value}));
    }

    return <header>
        <h1>Todo</h1>
        <div>
            <label htmlFor="find-tasks">Find tasks</label>
            <input id="find-tasks" type={'text'} onChange={inputChangeHandler}></input>
        </div>
    </header>
}

export default Header;