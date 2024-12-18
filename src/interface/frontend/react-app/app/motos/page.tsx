'use client';

import React, { useState, useEffect } from 'react';
import { getMotos, getBikeModels, createBikeModel } from '../../api';
import { useRouter } from 'next/navigation';  // Nouvelle méthode pour App Router

const formatDate = (dateString: string) => {
  const date = new Date(dateString); // Convertir la chaîne en objet Date
  
  return date.toLocaleDateString('fr-FR'); // Format 'd/m/Y' pour la locale française
};

const MotosPage = () => {
  const [motos, setMotos] = useState<any[]>([]);
  const [bikeModels, setBikeModels] = useState<any[]>([]);
  const [newBikeModel, setNewBikeModel] = useState<string>(''); // Pour le nouveau modèle
  const router = useRouter();

  // Charger les motos
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

  // Charger les modèles de motos
  useEffect(() => {
    const fetchBikeModels = async () => {
      try {
        const data = await getBikeModels();
        setBikeModels(data);
      } catch (error) {
        console.error('Erreur lors du chargement des modèles de motos', error);
      }
    };

    fetchBikeModels();
  }, []);

  // Ajouter un nouveau modèle de moto
  const handleCreateBikeModel = async () => {
    if (newBikeModel.trim() === '') {
      alert("Veuillez entrer un nom de modèle.");
      return;
    }

    try {
      const createdModel = await createBikeModel(newBikeModel);
      setBikeModels((prev) => [...prev, createdModel]); // Ajouter à la liste
      setNewBikeModel(''); // Réinitialiser le champ
    } catch (error) {
      console.error('Erreur lors de la création du modèle de moto', error);
    }
  };

  const goToAddBikePage = () => {
    router.push('/motos/add');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Gestion des Motos</h1>

      {/* Bouton pour ajouter une moto */}
      <div className="flex justify-center mb-6">
        <button
          onClick={goToAddBikePage}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ajouter une Moto
        </button>
      </div>

      {/* Liste des motos */}
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
                  {/* Afficher les informations du client */}
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {moto.customer.firstName} {moto.customer.lastName} ({moto.customer.email})
                  </td>

                  {/* Afficher le modèle de moto */}
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {moto.bikeModel.name}
                  </td>

                  {/* Afficher le kilométrage */}
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {moto.kilometers} km
                  </td>

                  {/* Afficher le statut */}
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {moto.status === 1 ? 'Actif' : 'Inactif'}
                  </td>

                  {/* Afficher la date de circulation */}
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

      {/* Liste des modèles de motos */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Liste des Modèles de Motos</h2>
        <ul className="list-disc pl-6">
          {bikeModels.length > 0 ? (
            bikeModels.map((model) => (
              <li key={model.id} className="text-gray-700 mb-2">{model.name}</li>
            ))
          ) : (
            <p className="text-gray-500">Aucun modèle trouvé.</p>
          )}
        </ul>
      </div>

      {/* Formulaire pour ajouter un modèle de moto */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <input
          type="text"
          value={newBikeModel}
          onChange={(e) => setNewBikeModel(e.target.value)}
          placeholder="Nom du modèle de moto"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2"
        />
        <button
          onClick={handleCreateBikeModel}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Ajouter un Modèle
        </button>
      </div>
    </div>
  );
};

export default MotosPage;
