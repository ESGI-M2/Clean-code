'use client';

import React, { useState, useEffect } from 'react';
import { getEvents, createCustomerEvent } from '../../../../api';
import { useRouter, useSearchParams } from 'next/navigation';

const AddCustomerEventPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number>(0);
  const [eventDate, setEventDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get('id');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Erreur lors du chargement des événements', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEvent || !eventDate || !description) {
      alert('Tous les champs sont nécessaires!');
      return;
    }

    try {
      await createCustomerEvent(customerId!, selectedEvent, eventDate, description);
      router.push(`/customers/events?id=${customerId}`);
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement', error);
      alert('Erreur lors de l\'ajout de l\'événement');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Ajouter un Événement</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="event" className="mb-2 font-semibold">Événement</label>
          <select
            id="event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value={0}>Sélectionner un événement</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="eventDate" className="mb-2 font-semibold">Date de l'événement</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 font-semibold">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
            rows={4}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Ajouter l'Événement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomerEventPage;
