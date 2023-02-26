import React from 'react';
import Button from '../ui/button';
import TasksList from './tasks-list';

const addTaskButtonClicked = () => {
    console.log('button clicked');
}

const TasksDashboard:React.FC = () => {

  return <>
    <TasksList />
    <Button onClickHandler={addTaskButtonClicked} label={'Add tasks!'}></Button>
  </>  
}

export default TasksDashboard;
