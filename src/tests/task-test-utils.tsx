import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import TasksList from '../components/tasks/tasks-list';
import Header from '../components/header/header';

import { configureStore } from '@reduxjs/toolkit';
import { default as tasksList } from '../store/tasks-list-slice'
import {default as headerSearch} from '../store/header-search-slice';

import { ITasksList } from '../store/tasks-list-slice';

const generateTasks = (numberOfTasks: number): ITasksList => {
  let list: ITasksList = {
    value: [],
    id: 1,
  }
  for (let i = 0; i < numberOfTasks; i++) {
    list.value.push({
      description: 'test',
      id: list.id,
      isBeingEdited: false,
      isDone: false,
    });
    list.id++;
  }
  return list;
}

export const renderTaskList = (withTasks: number = 0) => {

  const store = withTasks > 0 ? 
  configureStore({
    reducer: {
      tasksList,
      headerSearch,
    },
    preloadedState: {tasksList: generateTasks(withTasks)},
  })
  :
  configureStore({
    reducer: {
      tasksList,
      headerSearch,
    }
  });

  render(<>
    <Provider store={store}>
      <Header />
      <TasksList />
    </Provider>
  </>);
}

export const getEditButton = () => screen.getByRole('button', {name: 'Edit task'});
export const getSaveButton = () => screen.getByRole('button', {name: 'Save'});
export const getAddTaskButton = () => screen.getByRole('button', {name: 'Add tasks!'});