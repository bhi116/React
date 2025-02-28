import { useState } from 'react'
import TodoTable from "./TodoTable";

function TodoList() {
     const [todo, setTodo] = useState({description: '', date: ''});
      const [todos, setTodos] = useState([]);
    
    
      const addTodo = (event) => {
        event.preventDefault();
        console.log("Lisätään todo todos-taulukkoon");
        setTodos([...todos, todo]);
        setTodo({ description: "", date: "" });
      }
    
      const removeTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
      };
    
      return (
        <>
        <h1>Add todo:</h1>
         <form onSubmit={addTodo}>
          <label>Description:
          <input type="text" value={todo.description} placeholder="Add todo" onChange={(event) => setTodo({...todo, description: event.target.value})}></input>
          </label>
          <label>Date:
          <input type="date" value={todo.date} onChange={(event) => setTodo({...todo, date: event.target.value})}></input>
          </label>
          <input type="submit" value="Add"></input>
         </form>

         <TodoTable todos={todos} removeTodo={removeTodo} />

        </>
      )
    
  }
  
  export default TodoList;