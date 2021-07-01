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
      this.props.updateEvents('', value);
    }
  };

  render() {
    const numberOfEvents = this.state.numberOfEvents;
    return (
      <div className="numberOfEvents">
      <form>
      <label htmlFor='numberOfEvent'>Number of Events</label>
        <input
          type="text"
          className="EventsNumber"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </form>
       <ErrorAlert text={this.state.errorText} />
    </div>
    );
  }
}


export default NumberOfEvents;
