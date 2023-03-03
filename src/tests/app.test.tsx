import { queryByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { act } from 'react-dom/test-utils';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

//test 123

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

  test('adding a task removes the no tasks yet text', () => {
    expect(screen.queryByText('No tasks yet...')).not.toBeInTheDocument();
  });

  test('save task button is disabled by default when the form is empty', () => {
    const addTaskButton = screen.getByRole('button', {name: "Save"});
    expect(addTaskButton).toBeDisabled();
  });

  test('editing and saving a task persists task state', () => {
    const taskTextInput = screen.getByRole('textbox', {name: 'task-description-input'});
    const saveChangesButton = screen.getByText('Save');

    act(()=>{
      userEvent.type(taskTextInput, 'hey');
      userEvent.click(saveChangesButton);
    });

    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByText('hey')).toBeInTheDocument();
  });

  test('setting tasks done checkbox renders the description with a line-through text decoration', () => {
    const description = screen.queryByText('hey');
    const checkbox = screen.getByLabelText('Done?');

    act(() => {
      userEvent.click(checkbox);
    });

    expect(description).toHaveStyle('text-decoration-line: line-through');
  });

  test('clicking edit button brings up task edit form', () => {
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    const edit = screen.getByRole('button', {name: 'Edit task'});

    act(() => {
      userEvent.click(edit);
    });

    expect(screen.queryByRole('form')).toBeInTheDocument();
  });

  test('task being done should be remembered and displayed correctly in edit form', () => {
    expect(screen.queryByRole('form')).toBeInTheDocument();
    const checkbox = screen.getByLabelText('Done?');
    expect(checkbox).toBeChecked();
  });

  test('edit form save button should be disabled if description form field is made empty again', () => {
    const taskTextInput = screen.getByRole('textbox', {name: 'task-description-input'});
    const saveButton = screen.getByRole('button', {name: 'Save'});
    
    act(() => {
      userEvent.type(taskTextInput, '{backspace}');
      userEvent.type(taskTextInput, '{backspace}');
      userEvent.type(taskTextInput, '{backspace}');
    });
    expect(saveButton).toBeDisabled();
    expect(saveButton).toBeInTheDocument();
  })

  test('after the form was emptied a warning should be displayed telling user that the input should be at least 1 character long', () => {
    const taskTextInput = screen.getByRole('textbox', {name: 'task-description-input'});

    act(() => {
      userEvent.type(taskTextInput, '{backspace}');
      userEvent.type(taskTextInput, '{backspace}');
      userEvent.type(taskTextInput, '{backspace}');
    });
    
    const errorMsg = screen.getByText('Description needs to be at least 1 character long')
    expect(errorMsg).toBeInTheDocument();
  });
});



