'use client';

import React, { useState, useEffect } from 'react';
import { getBikeModels, createBikeModel } from '../../api';

const BikeModelsPage = () => {
  const [bikeModels, setBikeModels] = useState<any[]>([]);
  const [modelName, setModelName] = useState<string>('');

  const fetchBikeModels = async () => {
    try {
      const data = await getBikeModels();
      setBikeModels(data);
    } catch (error) {
      console.error('Erreur lors du chargement des modèles de motos', error);
    }
  };

  useEffect(() => {
    fetchBikeModels();
  }, []);

  const handleCreateBikeModel = async () => {
    if (!modelName) {
      alert('Veuillez entrer un nom de modèle de moto.');
      return;
    }

    try {
      await createBikeModel(modelName);
      setModelName('');
      fetchBikeModels();
    } catch (error) {
      console.error('Erreur lors de la création du modèle de moto', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Modèles de Motos</h1>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Liste des Modèles de Motos</h2>
        <ul className="list-disc pl-6">
          {bikeModels.length > 0 ? (
            bikeModels.map((model) => (
              <li key={model.id} className="text-gray-700 mb-2">
                {model.name}
              </li>
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
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
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

export default BikeModelsPage;
