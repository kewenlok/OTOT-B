import { Button, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../consts/url";

export default function TaskList({ isListRefreshed, handleListChange }) {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`${BACKEND_URL}/api/task/all`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return response.text().then(message => {
              throw new Error(message)
            });
          }
          return response.json();
        })
        .then(data => {
          setTasks(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [isListRefreshed]);

  const deleteTask = (task_id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id })
    };
    fetch(`${BACKEND_URL}/api/task/delete`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {throw new Error(text)});
          }
          return response.json();
        })
        .then(() => { 
          setErrorMessage(''); 
          handleListChange();
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
  }

  const updateTask = (task_id, is_completed) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id, is_completed })
    };
    fetch(`${BACKEND_URL}/api/task/update`, requestOptions)
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {throw new Error(text)});
        }
        return response.json();
      })
      .then(() => { 
        setErrorMessage(''); 
        handleListChange();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return (
    <Box>
      <Grid item xs={12} md={6}>
        <Box maxWidth={'75%'} sx={{ margin: '0 auto' }}>
          <List dense={false}>
            {
              tasks.map(({_id, task_name, is_completed}) => {
                return (
                  <ListItem key={_id}>
                    
                    {
                      is_completed ? (
                        <ListItemText
                          primary={task_name}
                          sx={{ 'textDecoration': 'line-through' }}
                        />
                      ) : (
                        <>
                          <ListItemText
                            primary={task_name}
                          />
                          <Button variant="contained" color="success" onClick={() => updateTask(_id, true)}>
                            Done
                          </Button>
                        </>
                      )
                    }
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(_id)}>
                      <DeleteIcon />
                    </IconButton>
                    {errorMessage && <Typography sx={{color: 'red'}}>{errorMessage}</Typography>}
                  </ListItem>
                )
              })
            }
          </List>
        </Box>
      </Grid>
    </Box>
  );
}