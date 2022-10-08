import React, {useRef, useState} from 'react';
import './App.css';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {
    const columns = [
        { field: "description" , sortable: true, filter: true },
        { field: "date", sortable: true, filter: true },
        { field: "priority", sortable: true, filter: true,
            cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}]

  const [desc, setDesc] = useState('');
  const [newDate, setNewDate] = useState('');
  const [pr, setPriority] = useState('')
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const todoChanged = (event) => {
      setDesc(event.target.value);
  }
  
  const dateChanged = (event) => {
      setNewDate(event.target.value);
  }

  const priorityChanged = (event) => {
      setPriority(event.target.value);
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, {description: desc, date: newDate, priority: pr}]);
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

        <input placeholder={'Description'} type="text" onChange={todoChanged} value={desc}/>
        <input placeholder={'Date'} type="text" onChange={dateChanged} value={newDate}/>
        <input placeholder={'Priority'} type="text" onChange={priorityChanged} value={pr}/>

        <button onClick={addTodo}>Add</button>
        <button onClick={deleteTodo}>Delete</button>

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
