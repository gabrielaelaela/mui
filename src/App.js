import React, {useRef, useState} from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {AgGridReact} from "ag-grid-react";
import {Button} from "@mui/material";
import dayjs from "dayjs";
import './App.css';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {
    const columns = [
        { field: "description" , sortable: true, filter: true },
        { field: "date", sortable: true, filter: true },
        { field: "priority", sortable: true, filter: true,
            cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}]

  const [desc, setDesc] = useState('');
  const [newDate, setNewDate] = useState(dayjs(''));
  const [pr, setPriority] = useState('')
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const todoChanged = (event) => {
      setDesc(event.target.value);
  }
  
  const dateChanged = (date) => {
      setNewDate(date);
  }

  const priorityChanged = (event) => {
      setPriority(event.target.value);
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, {description: desc, date: newDate.toISOString(), priority: pr}]);
  }

  const deleteTodo = () => {
      if (gridRef.current.getSelectedNodes().length > 0) {
          setTodos(todos.filter((todo, index) =>
              index !== gridRef.current.getSelectedNodes()[0].childIndex))
      } else {
          alert('Select row first');
      }
  }

  return (
    <div className="App">
        <h1>TodoList</h1>

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                        label="Date"
                        inputFormat="MM/DD/YYYY"
                        value={newDate}
                        onChange={date => dateChanged(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
            <TextField
                label="Description"
                variant="standard"
                name="desc"
                value={desc}
                onChange={todoChanged}/>
            <TextField
                label="Priority"
                variant="standard"
                name="pr"
                value={pr}
                onChange={priorityChanged}/>

            <Button onClick={addTodo}variant="contained">Add</Button>
            <Button onClick={deleteTodo}variant="contained">Delete</Button>
        </Stack>

        <div className="ag-theme-material"
             style={{height: '700px', width: '35%', margin: 'auto', padding: '40px'}} >
            <AgGridReact
                ref={gridRef}
                rowSelection="single"
                onGridReady={ params => gridRef.current = params.api }
                columnDefs={columns}
                rowData={todos}>
            </AgGridReact>
        </div>
    </div>
  );
}

export default App;
