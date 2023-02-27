import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe('TASK_TESTS', () => {
  test('renders add task button', () => {
    render(<App />);
    const addTaskButton = screen.getByText(/add tasks!/i);
    expect(addTaskButton).toBeInTheDocument();
  });
  
  test('displays information if there are no tasks yet', ()=>{
    render(<App />);
    expect(screen.queryByText('No tasks yet...')).toBeInTheDocument();
  });
  
  test('clicking add task button displays task add form', () => {
    render(<App />);
    const addTaskButton = screen.getByText('Add tasks!');
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  
    fireEvent.click(addTaskButton);
  
    expect(screen.queryByRole('form')).toBeInTheDocument();
  });
})