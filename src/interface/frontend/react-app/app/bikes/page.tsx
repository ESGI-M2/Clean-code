'use client';

import React, { useState, useEffect } from 'react';
import { getMotos } from '../../api';
import { useRouter } from 'next/navigation';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

const MotosPage = () => {
  const [motos, setMotos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const data = await getMotos();
        setMotos(data);
      } catch (error) {
        console.error('Erreur lors du chargement des motos', error);
      }
    };

    fetchMotos();
  }, []);

  const goToAddBikePage = () => {
    router.push('/bikes/add');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Gestion des Motos</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={goToAddBikePage}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ajouter une Moto
        </button>
      </div>

      <div className="overflow-x-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Liste des Motos</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom du Client</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Modèle de Moto</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Kilométrage</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Statut</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date de Circulation</th>
            </tr>
          </thead>
          <tbody>
            {motos.length > 0 ? (
              motos.map((moto) => (
                <tr key={moto.id} className="hover:bg-gray-50">
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {moto.customer.firstName} {moto.customer.lastName} ({moto.customer.email})
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {moto.bikeModel.name}
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {moto.kilometers} km
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {moto.status === 1 ? 'Actif' : 'Inactif'}
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {formatDate(moto.circulationDate)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Aucune moto trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default MotosPage;
