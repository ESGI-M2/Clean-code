'use client';

import React, { useState, useEffect } from 'react';
import { getBikeModels, createTrial } from '../../../api';
import { useRouter } from 'next/navigation';

const AddTrialPage = () => {
  const [bikeModels, setBikeModels] = useState<any[]>([]);
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [kilometers, setKilometers] = useState<number>(0);
  const [selectedBikeModel, setSelectedBikeModel] = useState<number>(0);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBikeModel || !startDateTime || !endDateTime || !kilometers) {
      alert("Tous les champs sont nécessaires !");
      return;
    }

    const newTrial = {
      bikeId: selectedBikeModel,
      startDate: startDateTime,
      endDate: endDateTime,
      kilometers,
    };

    try {
      await createTrial(newTrial);
      router.push('/trials');
    } catch (error) {
      console.error('Erreur lors de la création de l\'essai', error);
      alert('Erreur lors de l\'ajout de l\'essai');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Ajouter un Essai</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="bikeModel" className="mb-2 font-semibold">Modèle de Moto</label>
          <select
            id="bikeModel"
            value={selectedBikeModel}
            onChange={(e) => setSelectedBikeModel(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value={0}>Sélectionner un modèle</option>
            {bikeModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="startDateTime" className="mb-2 font-semibold">Date et Heure de Début</label>
          <input
            type="datetime-local"
            id="startDateTime"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="endDateTime" className="mb-2 font-semibold">Date et Heure de Fin</label>
          <input
            type="datetime-local"
            id="endDateTime"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="kilometers" className="mb-2 font-semibold">Kilomètres</label>
          <input
            type="number"
            id="kilometers"
            value={kilometers}
            onChange={(e) => setKilometers(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Ajouter Essai
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTrialPage;
