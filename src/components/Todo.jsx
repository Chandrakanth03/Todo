import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {
  const [todoList, setTodoList] = useState(() => {
    // Retrieve todos from local storage and parse them safely
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (error) {
        console.error("Failed to parse todos from local storage:", error);
        return []; // Return an empty array if parsing fails
      }
    }
    return []; // Return an empty array if no todos are found
  });

  const inputRef = useRef();

  // Save todo list to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl"> 
      {/* --------------------title--------------- */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="icon" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>
      
      {/* -----------------Input-Box----------- */}
      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input
          type="text"
          ref={inputRef}
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
          placeholder='Add your task'
        />
        <button
          onClick={add}
          className='border-none bg-orange-600 rounded-full w-32 h-14 text-white text-lg font-medium cursor-pointer'>
          ADD +
        </button>
      </div>

      {/* ------------------todoList---------------- */}
      <div>
        {todoList.map((item) => (
          <TodoItems
            key={item.id}
            text={item.text}
            id={item.id}
            deleteTodo={deleteTodo}
            toggle={toggle}
            isComplete={item.isComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
