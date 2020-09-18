import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function App() {
  
  const styles = {
    container: {
      background: '50%',
      backgroundColor: fade('#D6D9D6', 0.5),
      height: '100vh'
    }
  }

  return (
    <Container fixed style={styles.container}>
      
      <Grid container spacing={4}>

        <Grid item xs={12}>
          Title and such
        </Grid>
        <Grid item xs={12}>
          <Paper>
            Upper Body
            <Button className="bodyPart" variant="outlined" color="secondary">
              Chest
            </Button>
            <Button className="bodyPart" variant="outlined" color="secondary">
              Back
            </Button>
            <Button className="bodyPart" variant="outlined" color="secondary">
              Arms
            </Button>
            <button>Regular Button</button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            Lower Body
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>Cardio</Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Get Workout
          </Button>
        </Grid>
        <Grid item xs={12}>
          <textarea id="textareahtml" rows="4" cols="150" placeholder="view workout here..."></textarea>
        </Grid>
      </Grid>

    </Container>


    
  );
}

export default App;
