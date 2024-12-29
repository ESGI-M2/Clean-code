'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReferentielMenuOpen, setReferentielMenuOpen] = useState(false);

  const toggleReferentielMenu = () => {
    setReferentielMenuOpen(!isReferentielMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold text-white hover:text-gray-300">
                Triumph Motorcycles
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/customers"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Clients
              </Link>
              <Link
                href="/bikes"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Motos
              </Link>
              <Link
                href="/trials"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Essais
              </Link>
              <Link
                href="/visits"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Visites
              </Link>

              <div className="relative">
                <button
                  onClick={toggleReferentielMenu}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Référentiels
                </button>

                {isReferentielMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg border border-gray-300">
                    <ul className="py-2">
                      <li>
                        <Link
                          href="/events"
                          className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-all"
                        >
                          Événements
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/bike-models"
                          className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-all"
                        >
                          Modèles de Motos
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/occupations"
                          className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-all"
                        >
                          Métiers
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/customers"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Clients
            </Link>
            <Link
              href="/motos"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Motos
            </Link>
            <Link
              href="/essais"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Essais
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
