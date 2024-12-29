'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCustomerEvents } from '../../../api';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

const CustomerEventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const customerId = searchParams.get('id');
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      if (customerId) {
        try {
          const data = await getCustomerEvents(customerId);
          setEvents(data);
        } catch (error) {
          console.error('Erreur lors du chargement des événements', error);
        }
      } else {
        console.error('ID du client manquant');
      }
    };

    fetchEvents();
  }, [customerId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Événements du Client #{customerId}</h1>

      <div className="text-center mb-4">
        <button
          onClick={() => router.push(`/customers/events/add?id=${customerId}`)}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Ajouter un Événement
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Événement</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{event.id}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{formatDate(event.eventDate)}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{event.description}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{event.event?.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  Aucun événement trouvé pour ce client.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => router.push(`/customers`)}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Retour
      </button>
    </div>
  );
};

export default CustomerEventsPage;
