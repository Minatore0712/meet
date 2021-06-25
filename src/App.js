import React from "react";
import { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";

import "./nprogress.css";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents(location, eventCount) {
    if (!location) {
      return;
    }

    getEvents().then((events) => {
      let locationEvents;
      if (location === "all") {
        locationEvents = events;
      } else {
        const filteredEvents = events.filter(
          (event) => event.location === location
        );
        if (!eventCount || eventCount === 0) {
          eventCount = filteredEvents.length;
        }
        locationEvents = filteredEvents.slice(0, eventCount + 1);
      }
      this.setState({
        events: locationEvents,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={(location) => this.updateEvents(location, this.state.numberOfEvents)}
        />
        <NumberOfEvents />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
