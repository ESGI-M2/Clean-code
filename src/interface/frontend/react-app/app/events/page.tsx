'use client';

import React, { useState, useEffect } from 'react';
import { getEvents, createEvent } from '../../api';

const EventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [eventName, setEventName] = useState<string>('');

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Erreur lors du chargement des événements', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async () => {
    if (!eventName) {
      alert('Veuillez entrer un nom d\'événement.');
      return;
    }

    try {
      await createEvent(eventName);
      setEventName('');
      fetchEvents();
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Événements</h1>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Liste des Événements</h2>
        <ul className="list-disc pl-6">
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id} className="text-gray-700 mb-2">
                {event.name}
              </li>
            ))
          ) : (
            <p className="text-gray-500">Aucun événement trouvé.</p>
          )}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Nom de l'événement"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2"
        />
        <button
          onClick={handleCreateEvent}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Ajouter un Événement
        </button>
      </div>
    </div>
  );
};

export default EventsPage;
