import axios from 'axios';

const API_OCCUPATIONS_URL = 'http://localhost:3000/occupations';
const API_BIKES_URL = 'http://localhost:3000/bikes';
const API_BIKEMODELS_URL = 'http://localhost:3000/bikemodels';
const API_CUSTOMERS_URL = 'http://localhost:3000/customers';
const API_CUSTOMER_EVENTS_URL = 'http://localhost:3000/customerevents';
const API_ESSAIS_URL = 'http://localhost:3000/trials';
const API_VISITS_URL = 'http://localhost:3000/visits';
const API_DRIVING_URL = 'http://localhost:3000/drivinglicenses';
const API_EVENTS_URL = 'http://localhost:3000/events';

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
    const response = await axios.get(API_BIKES_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des motos', error);
    throw error;
  }
};

export const createMoto = async (newMoto: any) => {
  try {
    const response = await axios.post(API_BIKES_URL, newMoto);
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

export const createBikeModel = async (name: string) => {
  try {
    const response = await axios.post(API_BIKEMODELS_URL, { name });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du modèle de moto', error);
    throw error;
  }
};

export const getCustomers = async () => {
  try {
    const response = await axios.get(API_CUSTOMERS_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des customers', error);
    throw error;
  }
};

export const getCustomerEvents = async (customerId: string) => {
  const response = await axios.get(`${API_CUSTOMER_EVENTS_URL}/events/${customerId}`);
  return response.data;
};

export const createCustomerEvent = async (
  customerId: string,
  eventId: number,
  eventDate: string,
  description: string
) => {
  try {
    const response = await axios.post(`${API_CUSTOMER_EVENTS_URL}`, {
      customerId,
      eventId,
      eventDate,
      description
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement', error);
    throw error;
  }
};

export const createCustomer = async (name: string) => {
  try {
    const response = await axios.post(API_CUSTOMERS_URL, { name });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du customer', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await axios.get(API_EVENTS_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des customers', error);
    throw error;
  }
};

export const createEvent = async (name: string) => {
  try {
    const response = await axios.post(API_EVENTS_URL, { name });
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

export const createVisit = async (
  customerId: number,
  bikeModelId: number,
  price: number,
  recapitulation: string,
  visitDate: string
) => {
  try {
    const response = await axios.post(API_VISITS_URL, {
      customerId,
      bikeModelId,
      price,
      recapitulation,
      visitDate,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la visite', error);
    throw error;
  }
};

export const createDrivingLicense = async (
  customerId: string,
  date: string,
  status: string,
  country: string
) => {
  try {
    const response = await axios.post(API_DRIVING_URL, {
      customerId,
      date,
      status,
      country,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du permis de conduire', error);
    throw error;
  }
};
