import React from "react";
import { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { WarningAlert } from './Alert';
import { getEvents, extractLocations } from "./api";

import "./nprogress.css";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentCity: "all",
    warningText: ''
  };

  componentDidMount() {
    const { numberOfEvents } = this.state;
    this.mounted = true;
    
    if (!navigator.onLine) {
      this.setState({
        warningText: 'Cached data is being displayed.'
      });
    }
    else {
      this.setState({
        warningText: ''
      })
    }

    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, numberOfEvents),
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events.slice(0, numberOfEvents)
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, numberOfEvents),
          currentCity: location,
        });
      }
    });
  };

  updateNumberOfEvents(eventNumber) {
    this.setState({ numberOfEvents: eventNumber });
    const { currentCity } = this.state;
    this.updateEvents(currentCity, eventNumber);
  }

  render() {
    return (
      <div className="App">
        <p className="title"><span>meet</span> App</p>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <NumberOfEvents
          updateNumberOfEvents={(e) => this.updateNumberOfEvents(e)}
        />
        <EventList events={this.state.events} />
        <WarningAlert text={this.state.warningText} />
      </div>
    );
  }
}

export default App;
