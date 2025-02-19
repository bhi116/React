import { useState } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState({description: '', date: ''});
  const [todos, setTodos] = useState([]);


  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  return (
    <>
    <h1>Add todo:</h1>
     <form onSubmit={addTodo}>
      <label>Description:</label>
      <input type="text" value={todo.description} onChange={(event) => setTodo({...todo, description: event.target.value})}></input>
      <label>Date:</label>
      <input type="date" value={todo.date} onChange={(event) => setTodo({...todo, date: event.target.value})}></input>
      <input type="submit" value="Add"></input>
     </form>
     
     <table>
      <tbody>
        <tr>
          <th>Date</th>
          <th>Description</th>
        </tr>
        {
        todos.map((todo, index) => (
        <tr key={index}>
          <td>{todo.date}</td>
          <td>{todo.description}</td>
        </tr>
        ))}
      </tbody>
     </table>
    </>
  )
}

export default App
