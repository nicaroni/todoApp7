import React, { useState } from "react";
import axios from "axios";
import API_URL from '../config';


const TodoForm = ({ dispatch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Get the token from localStorage
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No token found, please log in.");
      return; // Prevent submitting if there's no token
    }
  
    try {
      const response = await axios.post(
        `${API_URL}/todos`,  // The backend API to create a todo
        { description: input },  // The data (todo description)
        {
          headers: {
            "Authorization": `Bearer ${token}`,  // Attach token here
          },
        }
      );
  
      dispatch({ type: "ADD_TODO", payload: response.data });  // Dispatch the new todo to the state
      setInput(""); // Clear input after submitting
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="todo-form m-0 p-0 w-full">
      <div className="table-like-row flex items-center py-2">
        <div className="circle add-circle mx-[10px] text-primary text-xl cursor-pointer flex items-center justify-center w-6 h-6 border-2 border-primary rounded-full">+</div>
        <input
          type="text"
          className="form-control todo-input border-0 border-b border-[#e0e0e0] outline-none px-2 py-1 flex-1 text-information bg-transparent"
          placeholder="Add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary squishy add-todo-btn ml-4 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:brightness-110 transition" type="submit">Add</button>
      </div>
    </form>
  );
};

export default TodoForm;
