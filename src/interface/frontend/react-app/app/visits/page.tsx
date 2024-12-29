'use client';

import React, { useState, useEffect } from 'react';
import { getVisites } from '../../api';
import { useRouter } from 'next/navigation';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

const VisitesPage = () => {
  const [visites, setVisites] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchVisites = async () => {
      try {
        const data = await getVisites();
        setVisites(data);
      } catch (error) {
        console.error('Erreur lors du chargement des visites', error);
      }
    };

    fetchVisites();
  }, []);

  const goToAddVisitePage = () => {
    router.push('/visits/add');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Gestion des Visites</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={goToAddVisitePage}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ajouter une Visite
        </button>
      </div>

      {/* Liste des visites */}
      <div className="overflow-x-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Liste des Visites</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom du Client</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Modèle de Moto</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Prix de la Visite</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date de la Visite</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Détails</th>
            </tr>
          </thead>
          <tbody>
            {visites.length > 0 ? (
              visites.map((visite) => (
                <tr key={visite.id} className="hover:bg-gray-50">
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {visite.bike?.customer?.firstName} {visite.bike?.customer?.lastName} ({visite.bike?.customer?.email})
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {visite.bike?.bikeModel?.name ?? 'Modèle non disponible'}
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {visite.price} €
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {formatDate(visite.visitDate)}
                  </td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {visite.details ?? 'Détails non disponibles'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Aucune visite trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitesPage;
