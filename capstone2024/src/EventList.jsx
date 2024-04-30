import React from 'react';

const EventList = ({ date }) => {
  // Fetch events for the selected date or use dummy data
  const events = [
    { id: 1, title: "Event 1", time: "10:00 AM" },
    { id: 2, title: "Event 2", time: "2:00 PM" },
    // Add more events as needed
  ];

  return (
    <div>
      <h2>Events for {date}</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;