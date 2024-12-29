'use client';

import React, { useState, useEffect } from 'react';
import { getCustomers, getBikeModels, createMoto } from '../../../api';
import { useRouter } from 'next/navigation';

const AddBikePage = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [bikeModels, setBikeModels] = useState<any[]>([]);
  const [kilometers, setKilometers] = useState<number>(0);
  const [status, setStatus] = useState<number>(1);
  const [circulationDate, setCirculationDate] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<number>(0);
  const [selectedBikeModel, setSelectedBikeModel] = useState<number>(0);
    const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Erreur lors du chargement des clients', error);
      }
    };

    const fetchBikeModels = async () => {
      try {
        const data = await getBikeModels();
        setBikeModels(data);
      } catch (error) {
        console.error('Erreur lors du chargement des modèles de motos', error);
      }
    };

    fetchCustomers();
    fetchBikeModels();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCustomer || !selectedBikeModel || !circulationDate) {
      alert("Tous les champs sont nécessaires !");
      return;
    }

    const newMoto = {
      customerId: selectedCustomer,
      bikeModelId: selectedBikeModel,
      kilometers,
      status,
      circulationDate
    };

    try {
      await createMoto(newMoto);
      router.push('/bikes');
    } catch (error) {
      console.error('Erreur lors de la création de la moto', error);
      alert('Erreur lors de l\'ajout de la moto');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Ajouter une Moto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sélection du client */}
        <div className="flex flex-col">
          <label htmlFor="customer" className="mb-2 font-semibold">Client</label>
          <select
            id="customer"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value={0}>Sélectionner un client</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                #{customer.id} &nbsp;
                {customer.firstName} &nbsp;
                {customer.lastName}
                ({customer.email})
              </option>
            ))}
          </select>
        </div>

        {/* Sélection du modèle de moto */}
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

        {/* Kilométrage */}
        <div className="flex flex-col">
          <label htmlFor="kilometers" className="mb-2 font-semibold">Kilométrage</label>
          <input
            type="number"
            id="kilometers"
            value={kilometers}
            onChange={(e) => setKilometers(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Statut */}
        <div className="flex flex-col">
          <label htmlFor="status" className="mb-2 font-semibold">Statut</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value={1}>Actif</option>
            <option value={0}>Inactif</option>
          </select>
        </div>

        {/* Date de circulation */}
        <div className="flex flex-col">
          <label htmlFor="circulationDate" className="mb-2 font-semibold">Date de Circulation</label>
          <input
            type="date"
            id="circulationDate"
            value={circulationDate}
            onChange={(e) => setCirculationDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Ajouter Moto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBikePage;
