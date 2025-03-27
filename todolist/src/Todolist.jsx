import { AgGridReact } from "ag-grid-react";
import { useRef, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { Box, Button, Stack, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import 'dayjs/locale/fi';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
     const [todo, setTodo] = useState({description: '', date: null, priority: ''});
      const [todos, setTodos] = useState([]);
      const gridRef = useRef();
    
    
      const addTodo = (event) => {
        event.preventDefault();
        if (!todo.description.trim() || !todo.date || !todo.priority.trim()) {
          alert("All fields must be filled!");
          return;
        }
        const formattedTodo = {
          ...todo,
          date: todo.date.format("DD/MM/YYYY")
        };
        console.log("Lisätään todo todos-taulukkoon");
        setTodos([...todos, formattedTodo]);
        setTodo({ description: "", date: null, priority: "" });
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          height: "80vh"
        }}>
          
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={2}>
          <TextField
            label="Description"
            type="text" 
            name="description"
            value={todo.description} placeholder="Add todo" onChange={(event) => setTodo({...todo, description: event.target.value})}
          />
          
          <DatePicker
            label="Date"
            value={todo.date}
            onChange={(newValue) => setTodo({ ...todo, date: newValue.startOf('day') })}
            renderInput={(params) => <TextField {...params} />}
          />
          
          <TextField
            label="Priority"
            type="text"
            name="priority" 
            value={todo.priority} placeholder="Priority" onChange={(event) => setTodo({...todo, priority: event.target.value})}
          />
          <Button variant="contained" color="success" onClick={addTodo}>Add</Button>
          <Button variant="outlined" color="error" onClick={deleteTodo}>Delete</Button>
        </Stack>
        <div style={{width: 700, height: 500}}>
         
        <AgGridReact 
          rowData={todos}
          columnDefs={columns}
          ref={gridRef}
          rowSelection={{
            mode: "singleRow"
          }}
          onGridReady={ params => gridRef.current = params.api }
          />
          </div> 
      
        </Box>
        </LocalizationProvider>
      )
    
  }
  
  export default TodoList;