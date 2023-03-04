import { Provider } from 'react-redux';
import store from './store/store';
import TasksList from './components/tasks/tasks-list';
import Header from './components/header/header';

function App() {
  return <Provider store={store}>
    <Header />
    <TasksList />
  </Provider>
}

export default App;
