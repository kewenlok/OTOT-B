import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { BACKEND_URL } from "../consts/url";

export default function AddTaskSection({ handleListChange }) {
  const [task, setTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_name: task })
    };
    fetch(`${BACKEND_URL}/api/task/add`, requestOptions)
      .then(response => {
        if (!response.ok) {
          return response.text().then(message => {
            throw new Error(message)
          });
        }
        return response.json();
      })
      .then(() => { 
        setErrorMessage(''); 
        setTask('');
        handleListChange();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return (
    <Box>
      <Box display={'flex'} sx={{ width: '100%', marginTop: '20px', justifyContent: 'center' }} component='form' onSubmit={addTask}>
        <TextField
          required
          id="outlined-required"
          label="Task Name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="contained" type='submit' endIcon={<AddIcon />} sx={{ marginLeft: '20px' }}>
          Add
        </Button>
      </Box>
      {errorMessage ? (
        <Box display={'flex'} sx={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}>
          <Alert variant="outlined" severity="error" sx={{ maxWidth: '300px' }}>{errorMessage}</Alert>
        </Box>   
      ) : null}
    </Box>
  );
}