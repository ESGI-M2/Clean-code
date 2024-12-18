'use client';

import React, { useState, useEffect } from 'react';
import { getOccupations, createOccupation } from '../../api';

const OccupationsPage = () => {
  const [occupations, setOccupations] = useState<any[]>([]);
  const [newOccupation, setNewOccupation] = useState<string>('');

  useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const data = await getOccupations();
        setOccupations(data);
      } catch (error) {
        console.error('Erreur lors du chargement des métiers', error);
      }
    };

    fetchOccupations();
  }, []);

  const handleCreateOccupation = async () => {
    if (newOccupation.trim() === '') {
      alert("Veuillez entrer un nom de métier.");
      return;
    }

    try {
      const newOccupationData = await createOccupation(newOccupation);
      setOccupations((prevOccupations) => [...prevOccupations, newOccupationData]);
      setNewOccupation('');
    } catch (error) {
      console.error("Erreur lors de la création du métier", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Gestion des métiers</h1>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={newOccupation}
          onChange={(e) => setNewOccupation(e.target.value)}
          placeholder="Nom du métier"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2"
        />
        <button
          onClick={handleCreateOccupation}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom</th>
            </tr>
          </thead>
          <tbody>
            {occupations.length > 0 ? (
              occupations.map((occupation) => (
                <tr key={occupation.id} className="hover:bg-gray-50">
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{occupation.id}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{occupation.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                  Aucun métier trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OccupationsPage;
