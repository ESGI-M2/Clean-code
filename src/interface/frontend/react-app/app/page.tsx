'use client';

import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-blue-800 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Triumph Motorcycles</h1>
          <p className="text-xl mt-2">Gestion de flottes pour motos - Suivi, Maintenance et Optimisation</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Introduction</h2>
          <p className="text-lg text-gray-700">
            Triumph Motorcycles cherche à améliorer la gestion des motos utilisées par des
            entreprises partenaires (livreurs, coursiers, services de location, etc.) et par
            ses concessionnaires. Le projet consiste à développer une plateforme de gestion
            de flotte permettant à ces partenaires de suivre et optimiser l'utilisation des motos,
            tout en se concentrant sur des aspects comme la gestion des entretiens, le suivi du cycle
            de vie des motos, et d'autres aspects liés à la gestion efficace d’une flotte de véhicules.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Fonctionnalités</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Fonctionnalité 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Gestion des entretiens</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Planification des entretiens avec intervalles personnalisés</li>
                <li>Rappels automatiques pour les gestionnaires et les clients</li>
                <li>Historique des entretiens avec les détails des réparations</li>
              </ul>
            </div>

            {/* Fonctionnalité 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Gestion des pièces détachées</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Suivi des stocks de pièces détachées et alertes de stock bas</li>
                <li>Historique des commandes de pièces avec les coûts et délais</li>
              </ul>
            </div>

            {/* Fonctionnalité 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Suivi des essais</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Profil des conducteurs avec historique de conduite</li>
                <li>Suivi des essais de moto avec dates et durée</li>
                <li>Enregistrement des incidents liés aux conducteurs (accidents, infractions)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 py-12 mt-12">
          <h2 className="text-3xl font-semibold text-blue-800 text-center mb-6">Optimisez la gestion de votre flotte</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Notre plateforme vous aide à gérer vos motos de manière plus efficace, avec des outils
            adaptés pour chaque aspect du cycle de vie de la moto. Que ce soit pour le suivi des entretiens,
            la gestion des stocks de pièces ou le suivi des essais, vous pourrez améliorer la productivité et
            la rentabilité de votre entreprise.
          </p>
        </section>
      </main>

      <footer className="bg-blue-800 text-white py-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Triumph Motorcycles - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
