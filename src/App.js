import React from "react";
import { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen";

import EventGenre from "./data-visualization/EventGenre";
import EventNumbers from "./data-visualization/EventNumbers";

import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { WarningAlert } from "./Alert";

import "./nprogress.css";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentCity: "all",
    warningText: "",
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;

    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if (!navigator.onLine) {
      this.setState({
        warningText: "Cached data is being displayed.",
      });
    } else {
      this.setState({
        warningText: "",
      });
    }

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          console.log("componentDidMount");
          console.log(this.state);
          console.log(events);
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents(eventNumber) {
    this.setState({ numberOfEvents: eventNumber });
    const { currentCity } = this.state;
    this.updateEvents(currentCity, eventNumber);
  }

  updateEvents = (location, eventCount) => {
    let locationEvents;
    getEvents().then((events) => {
      if (location === "all" && eventCount === 0) {
        locationEvents = events;
      } else if (location !== "all" && eventCount === 0) {
        console.log("here");
        console.log(events);
        locationEvents = events.filter((event) => event.location === location);
        console.log("locationEvent");
        console.log(locationEvents);
      } else if (location === "" && eventCount > 0) {
        console.log("update events");
        console.log(events);
        console.log(eventCount);
        locationEvents = events.slice(0, eventCount);
      } else if (location === "" && eventCount === "") {
        locationEvents = events;
      }
      this.setState({
        events: locationEvents,
        numberOfEvents: eventCount,
      });
    });
  };

  render() {

    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;

    return (
      <div className="App">
        <p className="title">
          <span>meet</span> App
        </p>
        <WarningAlert text={this.state.warningText} />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />

        <div calssName="container">
          <div>
            <h3>Number of events per city</h3>
            <EventNumbers locations={this.state.locations} events={this.state.events} />{" "}
          </div>

          <div>
            <h3>Themes of the events</h3>
            <EventGenre events={this.state.events} />
          </div>
        </div>

        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
