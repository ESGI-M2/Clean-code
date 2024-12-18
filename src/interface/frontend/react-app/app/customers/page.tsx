'use client';

import React, { useState, useEffect } from 'react';
import { getCustomers } from '../../api';

const CustomersPage = () => {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Erreur lors du chargement des clients', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Gestion des Clients</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Prénom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Adresse</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Permis</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{customer.id}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{customer.firstName}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{customer.lastName}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{customer.email}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{customer.address}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">
                    {customer.drivingLicense
                      ? `${customer.drivingLicense.status} (${customer.drivingLicense.country})`
                      : 'Aucun'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Aucun client trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;
