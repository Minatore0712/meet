import React, { Component } from "react";

class Event extends Component {
  state = {
    showMore: false,
  };

  render() {
    const event = this.props.event;
    const eventISODateTime = new Date(event.start.dateTime);
    const dateTime = eventISODateTime.toDateString();
    return (
      <div className="event">
        <h1 className="name">{event.summary}</h1>
        <p className="EventDate">
          Start: {event.start.dateTime} - Time Zone: {event.start.timeZone}
        </p>
        <p>
          @ {event.summary} / {event.location}
        </p>
        <button className="details-btn">Show more</button>
      </div>
    );
  }
}
export default Event;
