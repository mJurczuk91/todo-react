import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import TasksList from './components/tasks/tasks-list';

function App() {
  return <Provider store={store}>
    <TasksList />
  </Provider>
}

export default App;
