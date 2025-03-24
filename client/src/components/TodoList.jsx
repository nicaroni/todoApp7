import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import axios from "axios";
import confetti from "canvas-confetti";
import API_URL from '../config';

import { jwtDecode } from "jwt-decode";

const TodoList = ({ todos, dispatch, startPomodoro }) => {
  
    useEffect(() => {
      const fetchTodos = async () => {
        const token = localStorage.getItem("token");
      
        if (!token) {
          console.log("No token found, redirecting to login...");
          return;
        }
      
        try {
          const response = await axios.get(`${API_URL}/todos`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          dispatch({ type: "SET_TODOS", payload: response.data });
        } catch (err) {
          console.error("Error fetching todos:", err);
        }
      };
      
    
      fetchTodos();

  }, [dispatch]);
  // State to toggle visibility of completed tasks
  const [showCompleted, setShowCompleted] = useState(false);

  // Filter todos into uncompleted and completed
  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  // Toggle completed tasks visibility
  const toggleCompletedTasks = () => {
    setShowCompleted(prev => !prev);
  };

  useEffect(() => {
    if (todos.length > 0 && uncompletedTodos.length === 0) {
      launchConfetti();
    }
  }, [todos]); // Runs whenever todos change

  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="todo-list w-full">
        <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="text-left pl-[176px] font-bold pb-2 border-b border-gray-200 text-primary">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Map over uncompleted todos and display them */}
          {uncompletedTodos.map((todo) => (
            <TodoItem key={todo.todo_id}
             todo={todo}
              dispatch={dispatch} 
              startPomodoro={startPomodoro} />
          ))}

            <tr>
            <td className="p-0" colSpan="2">
              <TodoForm dispatch={dispatch} />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Button to toggle the visibility of completed tasks */}
      <button onClick={toggleCompletedTasks} className="bg-secondary text-white py-2 px-4 rounded-md m-3 hover:bg-opacity-90">
        {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
      </button>

      {/* Display completed tasks */}
      {showCompleted && completedTodos.length > 0 && (
        <div className="completed-todos mt-4">
          <h3 className="text-xl text-white mb-2">Completed Tasks</h3>
          <table className="w-full bg-darkTable text-gray-100 rounded-xl overflow-hidden">
          <tbody>
              {completedTodos.map(todo => (
                <TodoItem 
                  key={todo.todo_id} 
                  todo={todo} 
                  dispatch={dispatch} 
                  startPomodoro={startPomodoro} 
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

        {todos.length > 0 && uncompletedTodos.length === 0 && (
        <div className="congrats-message mt-5 text-green-500 font-bold">100% complete! Take a break, you deserve it! 🍩☕</div>
      )}
    </div>
  );
};

export default TodoList;




