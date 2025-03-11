import { AgGridReact } from "ag-grid-react";
import { useRef, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
     const [todo, setTodo] = useState({description: '', date: '', priority: ''});
      const [todos, setTodos] = useState([]);
      const gridRef = useRef();
    
    
      const addTodo = (event) => {
        event.preventDefault();
        if (!todo.description.trim() || !todo.date.trim() || !todo.priority.trim()) {
          alert("All fields must be filled!");
          return;
        }
        console.log("Lisätään todo todos-taulukkoon");
        setTodos([...todos, todo]);
        setTodo({ description: "", date: "", priority: "" });
      }
    
      const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
          setTodos(todos.filter((todo, index) => 
            index != gridRef.current.getSelectedNodes()[0].id))
        }
        else {
          alert('Select a row first!');
        }
      };


      const columns = [
        {headerName: 'Description', field: 'description', sortable: true, filter: true},
        {headerName: 'Date', field: 'date', sortable: true, filter: true},
        {headerName: 'Priority', field: 'priority', sortable: true, filter: true,
          cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}
        }
      ]
    
      return (
        <>
        <h1>Add todo:</h1>
        <form onSubmit={addTodo} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label>Description:
          <input type="text" name="description" value={todo.description} placeholder="Add todo" onChange={(event) => setTodo({...todo, description: event.target.value})}></input>
          </label>
          <label>Date:
          <input type="date" name="date" value={todo.date} onChange={(event) => setTodo({...todo, date: event.target.value})}></input>
          </label>
          <label>Priority:
          <input type="text" name="priority" value={todo.priority} placeholder="Priority" onChange={(event) => setTodo({...todo, priority: event.target.value})}></input>
          </label>
          <button type="submit">Add</button>
          <button type="button" onClick={deleteTodo}>Delete</button>
         </form>
         <div style={{width: 700, height: 500}}>
         <AgGridReact 
          rowData={todos}
          columnDefs={columns}
          ref={gridRef}
          rowSelection="single"
          onGridReady={ params => gridRef.current = params.api }
          />
          </div> 
        </>
      )
    
  }
  
  export default TodoList;