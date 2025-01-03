'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createDrivingLicense } from '../../../../api';

const COUNTRY_CODES = [
  { code: 'FR', name: 'France' },
  { code: 'US', name: 'United States' },
  { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
];

const AddDrivingLicensePage = () => {
  const [emissionDate, setEmissionDate] = useState('');
  const [status, setStatus] = useState('');
  const [country, setCountry] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get('id');

  const STATUS_OPTIONS = [
    { label: 'Valid', value: 'VALID' },
    { label: 'Expired', value: 'EXPIRED' },
    { label: 'Suspended', value: 'SUSPENDED' },
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emissionDate || !status || !country) {
      alert('Tous les champs sont obligatoires!');
      return;
    }

    console.log(`Status: ${status}, Country: ${country}, Date: ${emissionDate}`);

    try {
      await createDrivingLicense(customerId!, emissionDate, status, country);
      alert('Permis de conduire ajouté avec succès!');
      router.push(`/customers`);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du permis de conduire', error);
      alert('Erreur lors de l\'ajout du permis de conduire');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Ajouter un Permis de Conduire</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <div className="flex flex-col">
          <label htmlFor="emissionDate" className="mb-2 font-semibold">Date d'émission</label>
          <input
            type="date"
            id="emissionDate"
            value={emissionDate}
            onChange={(e) => setEmissionDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="mb-2 font-semibold">Statut</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Sélectionnez un statut</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="mb-2 font-semibold">Pays</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Sélectionnez un pays</option>
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Ajouter le Permis
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDrivingLicensePage;
