'use client';

import React, { useState, useEffect } from 'react';
import { getCustomers, getBikeModels, createVisit } from '../../../api';
import { useRouter } from 'next/navigation';

const AddVisitPage = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [bikeModels, setBikeModels] = useState<any[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [recapitulation, setRecapitulation] = useState<string>('');
  const [visitDate, setVisitDate] = useState<string>('');
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

    if (!selectedCustomer || !selectedBikeModel || !visitDate || !price) {
      alert("Tous les champs sont nécessaires !");
      return;
    }

    const newVisit = {
      customerId: selectedCustomer,
      bikeModelId: selectedBikeModel,
      price,
      recapitulation,
      visitDate,
    };

    try {
        await createVisit(
          selectedCustomer,
          selectedBikeModel,
          price,
          recapitulation,
          visitDate
        );
        router.push('/visits');
      } catch (error) {
        console.error('Erreur lors de la création de la visite', error);
        alert('Erreur lors de l\'ajout de la visite');
      }
      
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Ajouter une Visite</h1>

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

        {/* Prix */}
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-2 font-semibold">Prix de la Visite (€)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Date de la visite */}
        <div className="flex flex-col">
          <label htmlFor="visitDate" className="mb-2 font-semibold">Date de Visite</label>
          <input
            type="date"
            id="visitDate"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Récapitulatif */}
        <div className="flex flex-col">
          <label htmlFor="recapitulation" className="mb-2 font-semibold">Récapitulatif</label>
          <textarea
            id="recapitulation"
            value={recapitulation}
            onChange={(e) => setRecapitulation(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Ajouter Visite
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVisitPage;
