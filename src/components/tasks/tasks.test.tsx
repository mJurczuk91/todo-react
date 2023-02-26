import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TasksDashboard from './tasks-dashboard';

test('renders add task button', () => {
  render(<TasksDashboard />);
  const addTaskButton = screen.getByText(/add tasks!/i);
  expect(addTaskButton).toBeInTheDocument();
});

test('displays information if there are no tasks yet', ()=>{
  render(<TasksDashboard />);
  expect(screen.queryByText('No tasks yet...')).toBeInTheDocument();
});

test('clicking add task button displays task add form', () => {
  render(<TasksDashboard />);
  const addTaskButton = screen.getByText('Add tasks!');
  expect(screen.queryByRole('form')).not.toBeInTheDocument();

  fireEvent.click(addTaskButton);

  expect(screen.queryByRole('form')).toBeInTheDocument();
});

