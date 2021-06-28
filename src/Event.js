import React, { Component } from "react";

class Event extends Component {
  state = {
    showMore: false,
  };

  handleShowHideButton = () => {
    if (this.state.showMore === true) {
      this.setState({ showMore: false });
    } else {
      this.setState({ showMore: true });
    }
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

        {this.state.showMore && (
          <div className='event-details'>
            <h2>About event:</h2>
            <a href={event.htmlLink}>See Details on Google Calendar</a>
            <p>{event.description}</p>
          </div>
        )}

        <button
          className="details-btn"
          onClick={() => this.handleShowHideButton()}
        >
          {!this.state.showMore ? "Show Details" : "Hide Details"}
        </button>
      </div>
    );
  }
}
export default Event;
