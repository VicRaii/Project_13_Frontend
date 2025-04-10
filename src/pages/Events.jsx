import React, { useEffect, useState } from 'react'
import { getEvents } from '../api/api'

const Events = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents()
      setEvents(data)
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <h2>Eventos</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h4>{event.title}</h4>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Events
