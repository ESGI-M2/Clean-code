'use client';

import React, { useState, useEffect } from 'react';
import { getTrial } from '../../api';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns'; // Importer la fonction format de date-fns

// Fonction pour formater la date et l'heure
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm'); // Format : jour/mois/année heure:minute
};

const EssaisPage = () => {
  const [essais, setEssais] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEssais = async () => {
      try {
        const data = await getTrial();
        setEssais(data);
      } catch (error) {
        console.error('Erreur lors du chargement des essais', error);
      }
    };

    fetchEssais();
  }, []);

  const goToAddEssaiPage = () => {
    router.push('/trials/add');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Gestion des Essais</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={goToAddEssaiPage}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ajouter un Essai
        </button>
      </div>

      <div className="overflow-x-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Liste des Essais</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom du Client</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Modèle de Moto</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Kilométrage</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Début</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Fin</th>
            </tr>
          </thead>
          <tbody>
            {essais.length > 0 ? (
              essais.map((essai) => (
                <tr key={essai.id} className="hover:bg-gray-50">
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {essai.bike?.customer?.firstName} {essai.bike?.customer?.lastName} ({essai.bike?.customer?.email})
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {essai.bike?.bikeModel?.name ?? 'Modèle non disponible'}
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {essai.kilometers} km
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {formatDateTime(essai.startDate)} {/* Affichage formaté de la date et de l'heure */}
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {formatDateTime(essai.endDate)} {/* Affichage formaté de la date et de l'heure */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Aucun essai trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EssaisPage;
