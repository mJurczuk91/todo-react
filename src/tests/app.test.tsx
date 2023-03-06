import { cleanup, queryByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderTaskList, getEditButton, getSaveButton, getAddTaskButton } from './task-test-utils';


describe('TASK_TESTS', () => {
  test('renders add task button', () => {
    renderTaskList();
    const addTaskButton = getAddTaskButton();
    expect(addTaskButton).toBeInTheDocument();
  });

  ////
  test('displays information if there are no tasks yet', () => {
    renderTaskList();
    expect(screen.queryByText('No tasks yet...')).toBeInTheDocument();
  });

  ////
  test('clicking add task button displays task add form', () => {
    renderTaskList();
    const addTaskButton = getAddTaskButton();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();

    act(() => {
      userEvent.click(addTaskButton);
    })

    expect(screen.queryByRole('form')).toBeInTheDocument();
  });

  ////
  test('adding a task removes the no tasks yet text', () => {
    renderTaskList(1);
    expect(screen.queryByText('No tasks yet...')).not.toBeInTheDocument();
  });

  ////
  test('save task button is disabled by default when user adds a new task', () => {
    renderTaskList();
    const addTaskButton = getAddTaskButton();

    act(() => {
      userEvent.click(addTaskButton);
    })

    const saveTaskButton = screen.getByRole('button', { name: "Save" });
    expect(saveTaskButton).toBeDisabled();
  });

  ////
  test('editing and saving a task persists task state', () => {
    renderTaskList(1);
    const editButton = getEditButton();
    act(() => userEvent.click(editButton));

    const taskTextInput = screen.getByRole('textbox', { name: 'task-description-input' });
    const saveChangesButton = getSaveButton();

    act(() => {
      userEvent.type(taskTextInput, 'hey');
      userEvent.click(saveChangesButton);
    });

    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByText('testhey')).toBeInTheDocument();
  });

  ////
  test('setting tasks done checkbox renders the description with a line-through text decoration', () => {
    renderTaskList(1)
    const description = screen.queryByText('test');
    const checkbox = screen.getByLabelText('Done?');

    act(() => {
      userEvent.click(checkbox);
    });

    expect(description).toHaveStyle('text-decoration-line: line-through');
  });

  ////
  test('clicking edit button brings up task edit form', () => {
    renderTaskList(1);
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    const edit = getEditButton();

    act(() => {
      userEvent.click(edit);
    });

    expect(screen.queryByRole('form')).toBeInTheDocument();
  });

  ////
  test('task being done should be remembered and displayed correctly in edit form', () => {
    renderTaskList(1);
    const edit = getEditButton();
    const checkbox = screen.getByLabelText('Done?');

    act(() => {
      userEvent.click(checkbox);
    });

    act(() => {
      userEvent.click(edit);
    });


    expect(checkbox).toBeChecked();
  });

  ////
  test('edit form save button should be disabled if description form field is made empty again', () => {
    renderTaskList(1);
    const edit = getEditButton();

    act(() => {
      userEvent.click(edit);
    });

    const taskTextInput = screen.getByRole('textbox', { name: 'task-description-input' });
    const saveButton = getSaveButton();

    act(() => {
      userEvent.type(taskTextInput, '{backspace}');
      userEvent.type(taskTextInput, '{backspace}');
      userEvent.type(taskTextInput, '{backspace}');
      userEvent.type(taskTextInput, '{backspace}');
    });

    expect(saveButton).toBeDisabled();
    expect(saveButton).toBeInTheDocument();
  })

  ////
  test('after the form was emptied a warning should be displayed telling user that the input should be at least 1 character long', () => {
    renderTaskList(1);
    const edit = getEditButton();

    act(() => {
      userEvent.click(edit);
    });

    const taskTextInput = screen.getByRole('textbox', { name: 'task-description-input' });

    act(() => {
      userEvent.type(taskTextInput, '{backspace}');
      userEvent.type(taskTextInput, '{backspace}');
      userEvent.type(taskTextInput, '{backspace}');
      userEvent.type(taskTextInput, '{backspace}');
    });

    const errorMsg = screen.getByText(/Description needs to be at least 1 character long/i)
    expect(errorMsg).toBeInTheDocument();
  });

  ////
  test('delete task button is visible on tasks list', () => {
    renderTaskList(1);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  test('delete task button is visible when user is editing the task', () => {
    renderTaskList(1);
    const edit = getEditButton();

    act(() => { userEvent.click(edit); });

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  ////
  test('clicking delete task button removes task', () => {
    renderTaskList(1);
    const deleteButton = screen.getByRole('button', {name: 'Delete'});

    act(() => { userEvent.click(deleteButton); });

    expect(screen.getByText("No tasks yet...")).toBeInTheDocument();
  });

  ////
  test('it renders a task search bar',() => { 
    renderTaskList();
    const searchBar = screen.getByRole('textbox', {name: 'Find tasks'});
    expect(searchBar).toBeInTheDocument();
  });

  ////
  test('only tasks that contain text typed into search bar in their description are shown', () => { 
    renderTaskList(1);
    const createTask = screen.getByRole('button', {name: 'Add tasks!'});
    const searchBar = screen.getByRole('textbox', {name: 'Find tasks'});

    act(() => { 
      userEvent.click(createTask);
    });

    const taskTextInput = screen.getByRole('textbox', { name: 'task-description-input' });
    const saveTaskButton = getSaveButton();
    const autoGeneratedTask = screen.getByText('test');

    act(() => { 
      userEvent.type(taskTextInput, '123');
      userEvent.click(saveTaskButton);
    });

    expect(autoGeneratedTask).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();

    act(() => { 
      userEvent.type(searchBar, '1');
      userEvent.click(saveTaskButton);
    });

    expect(autoGeneratedTask).not.toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

});