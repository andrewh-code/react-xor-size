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
    // upper body
    chestCheck: false,
    backCheck: false,
    armsCheck: false,
    absCheck: false,
    shouldersCheck: false,

    // lower body
    hipsCheck: false,
    quadsCheck: false,
    hamstringsCheck: false,
    calvesCheck: false,

    // cardio
    steadyStateCardioCheck: false,
    hiitCheck: false,
    plyoCheck: false

  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.checked
    })
    console.log(e.target.name);
    console.log("hi");
  }

  render() {

    const styles = {
      container: {
        background: '50%',
        backgroundColor: fade('#D6D9D6', 0.5),
        height: '100vh'
      },
      paper: {
        textAlign: 'cetner'
      }
    }

    return (
      <Fragment>
        <div className="container-bg">
          <div className="container">

            <h3>Exercise Generator</h3>

            <div className="row">
              Upper Body
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="form-check">
                  <input type="checkbox" 
                    className="form-check-input" 
                    name="chestCheck" 
                    checked={this.state.chestCheck}  
                    onClick={this.handleChange}></input>
                  <label className="form-check-label">Chest</label>
                </div>
              </div>
              <div className="col-sm-3">
              <div className="form-check">
                  <input type="checkbox" 
                    className="form-check-input" 
                    name="backCheck" 
                    checked={this.state.backCheck}  
                    onClick={this.handleChange}></input>
                  <label className="form-check-label">Back</label>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="shoulderCheck" 
                    checked={this.state.shoulderCheck}  
                    onClick={this.handleChange}></input>
                  <label className="form-check-label" for="exampleCheck1">Shoulders</label>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="armsCheck" 
                    checked={this.state.armsCheck}  
                    onClick={this.handleChange}></input>
                  <label className="form-check-label" for="exampleCheck1">Arms</label>
                </div>
              </div>
            </div>

            <div className="row">
              Lower Body
            </div>
            <div className="row">
              <div className="col-sm-3">
                One of three columns
              </div>
              <div className="col-sm-3">
                One of three columns
              </div>
              <div className="col-sm-3">
                One of three columns
              </div>
              <div className="col-sm-3">
                One of four columns
              </div>
            </div>

            <div className="row">
              Cardio/Plyo
            </div>
            <div className="row">
              <div className="col-sm-3">
                One of three columns
              </div>
              <div className="col-sm-3">
                One of three columns
              </div>
              <div className="col-sm-3">
                One of three columns
              </div>
              <div className="col-sm-3">
                One of four columns
              </div>
            </div>
            <div className="row">
              <button type="button" class="btn btn-primary">Get Exercise</button>
            </div>
            <div classNam="row">
              <div class="form-group">
                <textarea class="form-control" 
                          id="exampleFormControlTextarea1" 
                          placeholder="get workout here..."
                          rows="10"></textarea>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App


// put this in container
/*
<Container fixed style={styles.container}>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              Exercise Generator
          </Grid>
            <Grid item xs={12} >
              <Paper>
                <h3>Upper Body</h3>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.chestCheck}
                        onChange={this.handleChange}
                        name="chestCheck"
                        color="primary"
                      />
                    }
                    label="Chest"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.backCheck}
                        onChange={this.handleChange}
                        name="backCheck"
                        color="primary"
                      />
                    }
                    label="Back"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.shouldersCheck}
                        onChange={this.handleChange}
                        name="shouldersCheck"
                        color="primary"
                      />
                    }
                    label="Back"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.armsCheck}
                        onChange={this.handleChange}
                        name="armsCheck"
                        color="primary"
                      />
                    }
                    label="Arms"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.absCheck}
                        onChange={this.handleChange}
                        name="absCheck"
                        color="primary"
                      />
                    }
                    label="Abs"
                  />
                </FormGroup>
              </Paper>
            </Grid>

            <Grid item xs={12}>
            <Paper>
                <h3>Lower Body</h3>
                <FormGroup row>
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.hipsCheck}
                        onChange={this.handleChange}
                        name="hipsCheck"
                        color="primary"
                      />
                    }
                    label="Hips"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.quadsCheck}
                        onChange={this.handleChange}
                        name="quadsCheck"
                        color="primary"
                      />
                    }
                    label="Quadriceps"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.hamstringsCheck}
                        onChange={this.handleChange}
                        name="hamstringsCheck"
                        color="primary"
                      />
                    }
                    label="Hamstrings"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.calvesCheck}
                        onChange={this.handleChange}
                        name="calvesCheck"
                        color="primary"
                      />
                    }
                    label="Calves"
                  />
                </FormGroup>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper>
                <h3>Cardio/Plyometrics</h3>
                <FormGroup row>
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.steadyStateCardioCheck}
                        onChange={this.handleChange}
                        name="steadyStateCardioCheck"
                        color="primary"
                      />
                    }
                    label="Steady State Cardio"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.hiitCheck}
                        onChange={this.handleChange}
                        name="hiitCheck"
                        color="primary"
                      />
                    }
                    label="HIIT"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.plyoCheck}
                        onChange={this.handleChange}
                        name="plyoCheck"
                        color="primary"
                      />
                    }
                    label="Plyometrics"
                  />
                </FormGroup>
              </Paper>
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
        */