import axios from 'axios';

const API_OCCUPATIONS_URL = 'http://localhost:3000/occupations';
const API_MOTOS_URL = 'http://localhost:3000/bikes';
const API_BIKEMODELS_URL = 'http://localhost:3000/bikemodels';
const API_CUSTOMERS_URL = 'http://localhost:3000/customers';
const API_ESSAIS_URL = 'http://localhost:3000/trials';
const API_VISITS_URL = 'http://localhost:3000/visits';

export const getOccupations = async () => {
  try {
    const response = await axios.get(API_OCCUPATIONS_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des occupations', error);
    throw error;
  }
};

export const createOccupation = async (name: string) => {
  try {
    const response = await axios.post(API_OCCUPATIONS_URL, { name });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'occupation', error);
    throw error;
  }
};

export const getMotos = async () => {
  try {
    const response = await axios.get(API_MOTOS_URL);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des motos', error);
    throw error;
  }
};

export const createMoto = async (newMoto: any) => {
  try {
    const response = await axios.post(API_MOTOS_URL, newMoto);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la moto', error);
    throw error;
  }
};


export const getBikeModels = async () => {
  try {
    const response = await axios.get(API_BIKEMODELS_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des modèles de motos', error);
    throw error;
  }
};

// Fonction pour créer un modèle de moto
export const createBikeModel = async (name: string) => {
  try {
    const response = await axios.post(API_BIKEMODELS_URL, { name });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du modèle de moto', error);
    throw error;
  }
};

// Récupérer les clients
export const getCustomers = async () => {
  try {
    const response = await axios.get(API_CUSTOMERS_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des customers', error);
    throw error;
  }
};

// Créer un client
export const createCustomer = async (name: string) => {
  try {
    const response = await axios.post(API_CUSTOMERS_URL, { name });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du customer', error);
    throw error;
  }
};

export const getEssais = async () => {
  try {
    const response = await axios.get(API_ESSAIS_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des essais', error);
    throw error;
  }
};

export const getVisites = async () => {
  try {
    const response = await axios.get(API_VISITS_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des visites', error);
    throw error;
  }
};
