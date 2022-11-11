import { AppBar, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './App.css';
import AddTaskSection from './components/AddTaskSection';
import CurrencyInfo from './components/CurrencyInfo';
import TaskList from './components/TaskList';

function App() {
  const [isListRefreshed, setIsListRefreshed] = useState(false);

  return (
    <>
      <AppBar position="static" color="inherit">
        <Toolbar variant="dense">
          <Typography variant="h5" color="primary">
            Task Log
          </Typography>
        </Toolbar>
      </AppBar>
      <AddTaskSection handleListChange={() => {setIsListRefreshed(!isListRefreshed)}} />
      <TaskList isListRefreshed={isListRefreshed} handleListChange={() => {setIsListRefreshed(!isListRefreshed)}} />
      <CurrencyInfo />
    </> 
  );
}

export default App;
