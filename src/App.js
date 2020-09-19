import React, { Fragment, Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

export class App extends Component {

  state = {
    checkedB: false
  }

  handleChange = (e) => {
    this.setState({
        ...this.state,
        [e.target.name]: e.target.checked
    })
    console.log(e.target.name);
  }

  render() {

    const styles = {
      container: {
        background: '50%',
        backgroundColor: fade('#D6D9D6', 0.5),
        height: '100vh'
      }
    }

    return (
      <Fragment>
        <Container fixed style={styles.container}>

          <Grid container spacing={4}>

            <Grid item xs={12}>
              Title and such
          </Grid>
            <Grid item xs={12}>
              <Paper>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedB}
                        onChange={this.handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Primary"
                  />

                </FormGroup>
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
      </Fragment>
    )
  }
}

// export class App extends Component {
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }

export default App
