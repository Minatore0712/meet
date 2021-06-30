import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorText: '',
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1) {
      return this.setState({
        errorText: 'Please choose a number between 1 and 32',
        numberOfEvents: ''
      });
    } else if (value > 32) {
      return this.setState({
        errorText: 'Please choose a number between 1 and 32',
        numberOfEvents: ''
      });
    } else {
      this.setState({
        numberOfEvents: value,
        errorText: '',
      });
    this.props.updateNumberOfEvents('', event.target.value);
    }
  };

  render() {
    const numberOfEvents = this.state.numberOfEvents;
    return (
      <div className="numberOfEvents">
      <form>
        <label>Number of Events:</label>
        <input
          type="text"
          className="EventsNumber"
          value={numberOfEvents}
          onChange={(e) => this.handleInputChanged(e)}
        />
      </form>
      <ErrorAlert text={this.state.errorText} />
    </div>
    );
  }
}


export default NumberOfEvents;
