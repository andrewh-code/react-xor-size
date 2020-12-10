import React, { Fragment, Component } from 'react';
import './App.css';
import axios from 'axios';

export class App extends Component {
  
    MAX_UB_COUNT = 2;
    MAX_LB_COUNT = 2;
    MAX_CARDIO_COUNT = 1;
    LIMIT = 3;

    domain = process.env.REACT_APP_API_URL + ":" + process.env.REACT_APP_API_PORT;
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
    endpointTest: null,
    loading: true,
    clicked: false
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
    
    this.setState({
      endpointTest: endpoint
    });

    return endpoint;
  }

  getExercises = () => {

    const {
      isCleared,
      clicked
    } = this.state;
    
    let endpoint = this.buildEndpoint();
    
    this.setState({
      clicked: !clicked
    });

    // axios
    if (isCleared){
      // 10s time out
      axios.get(endpoint, { timeout: 10000})
        .then(serverResponse =>{
        let data = serverResponse.data;       
        let output = this.processData(data.data);
        console.log("here");
        this.setState({
          exercises: data.data,
          exerciseOutput: output,
          isCleared: false,
          loading: false
        });
      }).catch((error) =>{
          // parse error here
          let errorMsg = "";
          if (error.response && error.response.data) {
              errorMsg = error.response.data.data;
          } else {
            errorMsg = "unable to contact backend service...";
          }
          this.setState ({
            exerciseOutput: errorMsg
          });
      });
    } 
  }

  processData = (data) => {
    let ubExercises = data[0].exercises;
    let lbExercises = data[1].exercises;
    let cardioExercises = data[2].exercises;
    let output = "";
    let divider = "=============================================";
    let columnArray = ['reps x sets', 'exercise', 'muscle group', 'youtube link'];
    let header = "reps x sets \t| exercise \t| muscle group \t| youtube \t\n";
    output = output.concat(header);
    
    ubExercises.forEach(ex => {
      let name = ex.exercise_name;
      let muscle = ex.muscle_group;
      let youtube = ex.youtube_link;
      let repsSets = "3x10";

      let row = `${repsSets} \t| ${name} \t| ${muscle} \t| ${youtube} \t\n`
      output = output.concat(row);
    });
    output.concat(divider);
    lbExercises.forEach(ex => {
      let name = ex.exercise_name;
      let muscle = ex.muscle_group;
      let youtube = ex.youtube_link;
      let repsSets = "3x10";

      let row = `${repsSets} \t| ${name} \t| ${muscle} \t| ${youtube} \t\n`
      output = output.concat(row);
    });
    output.concat(divider);
    cardioExercises.forEach(ex => {
      let name = ex.exercise_name;
      let muscle = ex.muscle_group;
      let youtube = ex.youtube_link;
      let repsSets = "3x10";

      let row = `${repsSets} \t| ${name} \t| ${muscle} \t| ${youtube} \t\n`
      output = output.concat(row);
    });
    console.log(output)
    
    return output;
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
      isCleared: true,
      endpointTest: null,
      loading: false,
      clicked: false,
    });
  }

  render() {
    const {
      endpointTest,
      loading,
      clicked
    } = this.state;

    const loadingMsg = "retrieving exercises...";
    // const ubDisabledCheck = ubCount > MAX_UB_COUNT;

    return (
      <Fragment>
        <div className="container-bg">
          <div className="container">

            <h3>Exercise Generator</h3>
            <hr id="title"></hr>
            <div className="row">
            <h4>Upper Body</h4>
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
              
            </div>
            <div className="row justify-content-center">
              <p>{endpointTest}</p>
            </div>
            <div className="row justify-content-center">
              <div className="form-group">
                <textarea className="form-control" 
                          id="exampleFormControlTextarea1" 
                          placeholder="get workout here..."
                          value={ (loading && clicked) ? loadingMsg : this.state.exerciseOutput }
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