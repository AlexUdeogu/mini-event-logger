import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const EventLogger = () => {
  const [events, setEvents] = useState([]);

  const logEvent = (event) => {
    const newEvent = {
      id: events.length + 1,
      type: event.type,
      timeStamp: new Date().toISOString(),
    };
    setEvents([...events, newEvent]);
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(events);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'events.csv');
  };

  return (
    <div>
      <button onClick={(e) => logEvent(e)}>Log Click Event</button>
      <button onClick={downloadCSV}>Download CSV</button>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.type} at {event.timeStamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventLogger;
