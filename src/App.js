import React from "react";
import { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen";
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;

    return (
      <div className="App">
        <p className="title">
          <span>meet</span> App TEST
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

        <h3>Events in each city</h3>

        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="city"/>
          <YAxis type="number" dataKey="number" name="number of events" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={this.getData()} fill="#8884d8" />
        </ScatterChart>
        {console.log("app state")}
        {console.log(this.state)}
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
