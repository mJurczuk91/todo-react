import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('TASK_TESTS', () => {
  beforeEach(() => {
    render(<App />);
  })

  test('renders add task button', () => {
    const addTaskButton = screen.getByText('Add tasks!');
    expect(addTaskButton).toBeInTheDocument();
  });
  
  test('displays information if there are no tasks yet', ()=>{
    expect(screen.queryByText('No tasks yet...')).toBeInTheDocument();
  });
  
  test('clicking add task button displays task add form',() => {
    const addTaskButton = screen.getByText('Add tasks!');
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  
    act(() => {
      userEvent.click(addTaskButton);
    })
  
    expect(screen.queryByRole('form')).toBeInTheDocument();
  });

  test('adding a task removes no tasks yet information', () => {
    expect(screen.queryByText('No tasks yet...')).not.toBeInTheDocument();
  });

  test('editing and saving a task persists task state', () => {
    const taskTextInput = screen.getByPlaceholderText('Enter task description');
    const saveChangesButton = screen.getByText('Save');

    act(()=>{
      userEvent.type(taskTextInput, 'hey');
      userEvent.click(saveChangesButton);
    })

    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByText('hey')).toBeInTheDocument();
  });

})

