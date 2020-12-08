import React, { Fragment, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

export class App extends Component {
  
  
    MAX_UB_COUNT = 2;
    MAX_LB_COUNT = 2;
    MAX_CARDIO_COUNT = 1;
    LIMIT = 3;

    domain ="http://localhost:5000";
    apiPath = "/api/v1/exercises/random?muscle_group="; 
  
  state = {
    // upper body
    chestCheck: false,
    backCheck: false,
    armsCheck: false,
    absCheck: false,
    shouldersCheck: false,

    // lower body
    glutesCheck: false,
    quadsCheck: false,
    hamstringsCheck: false,
    calvesCheck: false,

    // cardio
    steadyStateCheck: false,
    hiitCheck: false,
    plyoCheck: false,

    // count
    ubCount: 0,
    lbCount: 0,
    cardioCount: 0,

    exerciseOutput: "get workout here...",
    results: null,
    isCleared: true,
    exercises: null,
    endpointTest: null
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.checked
    })
  }

  handleTextAreaChange = () => {
    console.log(this.state.exercises)
  }
  
  buildEndpoint = () => {
    
    //http://localhost:5000/api/v1/exercises/random?
    let endpoint = this.domain + this.apiPath;
    const {
      chestCheck,
      backCheck,
      armsCheck,
      absCheck,
      shouldersCheck,
      glutesCheck,
      quadsCheck,
      hamstringsCheck,
      calvesCheck,
      steadyStateCheck,
      hiitCheck,
      plyoCheck
    } = this.state
    // let qpMap = new Map([
    //   ['chest', chestCheck],['back', backCheck],['arms', armsCheck],['abs', absCheck],['shoulders', shouldersCheck],
    //   ['glutes', glutesCheck],['quadriceps', quadsCheck],['hamstrings', hamstringsCheck],['calves', calvesCheck],
    //   ['steadystate', steadyStateCheck],['hiit', hiitCheck],['plyo', plyoCheck]]);
  
    // for (const [k,v] of qpMap.entries()){
    //   if (v){
    //     if iterator
    //     endpoint = endpoint.concat(k + ",")
    //   }
    // }
    let qpArray = [];
    if (chestCheck) 
      qpArray.push("chest")
    if (backCheck){
      qpArray.push("back")
    }
    if (armsCheck){
      qpArray.push("arms")
    }
    if (absCheck){
      qpArray.push("abs")
    }
    if (shouldersCheck){
      qpArray.push("shoulders")
    }
    if (glutesCheck){
      qpArray.push("glutes")
    }
    if (quadsCheck){
      qpArray.push("quadriceps")
    }
    if (hamstringsCheck){
      qpArray.push("hamstrings")
    }
    if(calvesCheck){
      qpArray.push("calves")
    }
    if(steadyStateCheck){
      qpArray.push("steady")
    }
    if(hiitCheck){
      qpArray.push("hiit")
    }
    if(plyoCheck){
      qpArray.push("plyometrics")
    }

    for (let i = 0; i < qpArray.length; i++){
      if (i === qpArray.length-1){
        endpoint = endpoint.concat(qpArray[i]);
      } else{
        endpoint = endpoint.concat(qpArray[i] + ",");
      }
    }
    endpoint = endpoint.concat("&limit=" + this.LIMIT);
    console.log("this is the endpoint:" + endpoint);

    return endpoint;
  }

  getExercises = () => {

    const isCleared = this.state.isCleared;
    
    let endpoint = this.buildEndpoint();
    // build qp
    
    // axios
    if (isCleared){
      axios.get(endpoint).then(serverResponse =>{
        let data = serverResponse.data;       
        this.processData(data.data)
        this.setState({
          exercises: data.data,
          isCleared: false
        });

      }).catch((error) =>{
          // parse error here
          this.setState ({
            exerciseOutput: error.response.data.data
          });
          console.log(error.response.data.data);
          console.log(error.response.status);
      });
    } 
  }

  processData = (data) => {
    console.log(data)
  }

  clear = () => {
    // clear all values
    this.setState ({
      // upper body
    chestCheck: false,
    backCheck: false,
    armsCheck: false,
    absCheck: false,
    shouldersCheck: false,

    // lower body
    glutesCheck: false,
    quadsCheck: false,
    hamstringsCheck: false,
    calvesCheck: false,

    // cardio
    steadyStateCheck: false,
    hiitCheck: false,
    plyoCheck: false,

    exerciseOutput: "get workout here...",
    exercises: null,
    isCleared: true
    });
  }

  render() {
    const {
      ubCount,
      MAX_UB_COUNT,
      endpointTest
    } = this.state;

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
    // const ubDisabledCheck = ubCount > MAX_UB_COUNT;

    return (
      <Fragment>
        <div className="container-bg">
          <div className="container">

            <h3>Exercise Generator</h3>
            <hr id="title"></hr>
            <div className="row border">
            <h4>Upper Body</h4>
            </div>
            <div className="row border">
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
                    onClick={this.handleChange}
                    defaultChecked></input>
                  <label className="form-check-label">Back</label>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="shouldersCheck" 
                    checked={this.state.shouldersCheck}  
                    onClick={this.handleChange}
                    defaultChecked></input>
                    {/* do I need htmlFor? */}
                  <label className="form-check-label" htmlFor="exampleCheck1">Shoulders</label>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="armsCheck" 
                    checked={this.state.armsCheck}  
                    onClick={this.handleChange}
                    defaultChecked></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Arms</label>
                </div>
              </div>
            </div>

            <div className="row">
              <h4>Lower Body</h4>
            </div>
            <div className="row">
              <div className="col-sm-3">
              <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="quadsCheck" 
                    checked={this.state.quadsCheck}  
                    onClick={this.handleChange}
                    defaultChecked></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Quads</label>
                </div>
              </div>
              <div className="col-sm-3">
              <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="hamstringsCheck" 
                    checked={this.state.hamstringsCheck}  
                    onClick={this.handleChange}
                    defaultChecked></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Hamstrings</label>
                </div>
              </div>
              <div className="col-sm-3">
              <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="glutesCheck" 
                    checked={this.state.glutesCheck}  
                    onClick={this.handleChange}
                    defaultChecked></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Glutes</label>
                </div>
              </div>
              <div className="col-sm-3">
              <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="calvesCheck" 
                    checked={this.state.calvesCheck}  
                    onClick={this.handleChange}
                    defaultChecked></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Calves</label>
                </div>
              </div>
            </div>

            <div className="row">
              <h4>Cardio/Plyo</h4>
            </div>
            <div className="row">
              <div className="col-sm-4">
              <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="steadyStateCheck" 
                    checked={this.state.steadyStateCheck}  
                    onClick={this.handleChange}
                    defaultChecked></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Steady State</label>
                </div>
              </div>
              <div className="col-sm-4">
              <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="hiitCheck" 
                    checked={this.state.hiitCheck}  
                    onClick={this.handleChange}></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">HIIT</label>
                </div>
              </div>
              <div className="col-sm-4">
              <div className="form-check">
                <input type="checkbox" 
                    className="form-check-input" 
                    name="plyoCheck" 
                    checked={this.state.plyoCheck}  
                    onClick={this.handleChange}
                    defaultChecked></input>
                  <label className="form-check-label" htmlFor="exampleCheck1">Plyometrics</label>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="row justify-content-center" id="getExercises">
              <button type="button" 
                  className="btn btn-primary"
                  onClick={this.getExercises}>

                    Get Exercises
              </button>
              <p>{endpointTest}</p>
            </div>
            <div className="row justify-content-center">
              <div className="form-group">
                <textarea className="form-control" 
                          id="exampleFormControlTextarea1" 
                          placeholder="get workout here..."
                          value={this.state.exerciseOutput}
                          onChange={this.handleTextAreaChange}
                          rows="10" cols="100"></textarea>
              </div>
            </div>
            <div className="row justify-content-center">
              <button type="button" 
                  className="btn btn-primary"
                  onClick={this.clear}>
                    Clear
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App