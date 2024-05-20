import React from 'react';
import { render, fireEvent, act } from '@testing-library/react'; // Importa act desde @testing-library/react
import '@testing-library/jest-dom'; // Importa las extensiones de jest-dom
import Header from './../components/Header';
import TodoForm from './../components/TodoForm';
import TodoList from './../components/TodoList';

test('renders header with correct text', () => {
  const { getByText } = render(<Header />);
  const headerElement = getByText(/Lista de Tareas/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders input field with placeholder', () => {
  const { getByPlaceholderText } = render(<TodoForm />);
  const inputElement = getByPlaceholderText('Agregar nueva tarea');
  expect(inputElement).toBeInTheDocument();
});

test('renders todos correctly', () => {
  const todos = ['Tarea 1', 'Tarea 2', 'Tarea 3'];
  const { getByText } = render(<TodoList todos={todos} />);
  todos.forEach(todo => {
    const todoElement = getByText(todo);
    expect(todoElement).toBeInTheDocument();
  });
});

test('adds new todo on form submission', () => {
  const handleAddTodo = jest.fn();
  const { getByPlaceholderText, getByText } = render(<TodoForm onAdd={handleAddTodo} />);
  
  const inputElement = getByPlaceholderText('Agregar nueva tarea');
  fireEvent.change(inputElement, { target: { value: 'Nueva Tarea' } });
  
  act(() => { // Utiliza act para envolver la interacción del usuario
    const submitButton = getByText('Agregar');
    fireEvent.click(submitButton); // Cambiado de submit a click para simular mejor el evento
  });
  
  expect(handleAddTodo).toHaveBeenCalledWith('Nueva Tarea');
});

test('deletes todo on button click', () => {
  const handleDeleteTodo = jest.fn();
  const todos = ['Tarea 1', 'Tarea 2', 'Tarea 3'];
  const { getAllByText } = render(<TodoList todos={todos} onDelete={handleDeleteTodo} />);
  
  const deleteButtons = getAllByText('Eliminar');
  fireEvent.click(deleteButtons[1]); // Elimina la segunda tarea
  
  expect(handleDeleteTodo).toHaveBeenCalledWith(1); // Asegúrate de que el índice es el correcto
});

