import React, { useState } from "react";
import "./App.css";
const TodoList = ({ todo, handleCheck, handleDelete }) => {
  const check = () => {
    handleCheck(todo.id);
  };
  const deleteTodo = () => {
    handleDelete(todo.id);
  };
  return (
    <li className="todo-item">
      <div className="createColor">
        {todo.done ? (
          <span className="check" onClick={check}>
            &#9745;
          </span>
        ) : (
          <span className="check" onClick={check}>
            &#9744;
          </span>
        )}
        {todo.text}
      </div>
      <span className="btn-delete" onClick={deleteTodo}>
        X
      </span>
    </li>
  );
};

export default function TodoApp() {
  const [id, setId] = useState(0);
  const [todos, setTodos] = useState([]);
  const [chosenSide, setChosenSide] = useState("all");

  const handleTodos = (e) => {
    const todoText = document.querySelector(".input_todo");
    if (e.key === "Enter" && todoText.value) {
      setTodos([
        ...todos,
        {
          id,
          text: todoText.value,
          done: false,
        },
      ]);
      const newId = id + 1;
      setId(newId);
      todoText.value = "";
    }
  };

  const handleDelete = (selectedId) => {
    const balance = todos.filter((todo) => todo.id !== selectedId);
    setTodos(balance);
  };

  const handleCheck = (selectedId) => {
    const balanceTodos = [...todos];
    const result = balanceTodos.map((todo) => {
      if (todo.id === selectedId) {
        return todo.done ? { ...todo, done: false } : { ...todo, done: true };
      }
      return todo;
    });
    result.map((item) => console.log(item));
    setTodos(result);
  };

  const handleSide = (side) => {
    setChosenSide(side);
  };

  return (
    <div className="container">
      <h1 className="title">TO DO LIST</h1>
      <div className="wrapper">
        <div className="input">
          <input
            className="input_todo"
            type="text"
            placeholder="What you need to do?"
            onKeyPress={handleTodos}
          />
        </div>
        <div className="todos">
          <div className="nav">
            <div className="remained_numbers" />
            <ul className="nav__btns">
              <li
                className="nav__all nav__btn"
                id="all"
                onClick={() => {
                  handleSide("all");
                }}
              >
                All
              </li>
              <li
                className="nav__active nav__btn"
                id="active"
                onClick={() => {
                  handleSide("active");
                }}
              >
                New
              </li>
              <li
                className="nav__done nav__btn"
                id="done"
                onClick={() => {
                  handleSide("done");
                }}
              >
                Completed
              </li>
            </ul>
          </div>
          <ul className="list-group">
            {todos
              .filter((todo) => (chosenSide === "done" ? todo.done : true))
              .filter((todo) => (chosenSide === "active" ? !todo.done : true))
              .map((todo) => (
                <TodoList
                  key={todo.id}
                  todo={todo}
                  handleDelete={handleDelete}
                  handleCheck={handleCheck}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
