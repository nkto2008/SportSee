import { UserModel, ActivityModel, AverageSessionModel, PerformanceModel } from '../model/user';
import { mockUserData, mockActivityData, mockAverageSessionsData, mockPerformanceData } from '../mock/data';

const API_BASE_URL = process.env.API_BASE_URL;

const fetchData = async (url, mockData) => {
  if (process.env.USE_API !== 'true') {
    console.log('Utilisation des données mock');
    return { data: mockData };
  } else {
    console.log('Appel à l\'API réelle');
    const response = await fetch(`${API_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
};

export const fetchUserData = async (userId) => {
  try {
    const data = await fetchData(`/user/${userId}`, mockUserData.find(user => user.id === parseInt(userId)));
    console.log('Données utilisateur reçues:', data);
    return new UserModel(data.data);
  } catch (error) {
    console.error('Erreur API (utilisateur):', error);
    throw error;
  }
};

export const fetchUserActivity = async (userId) => {
  try {
    const data = await fetchData(`/user/${userId}/activity`, mockActivityData.find(activity => activity.userId === parseInt(userId)));
    console.log('Données d\'activité reçues:', data);
    return new ActivityModel(data.data);
  } catch (error) {
    console.error('Erreur API (activité):', error);
    throw error;
  }
};

export const fetchUserAverageSessions = async (userId) => {
  try {
    const data = await fetchData(`/user/${userId}/average-sessions`, mockAverageSessionsData.find(session => session.userId === parseInt(userId)));
    console.log('Données de sessions moyennes reçues:', data);
    return new AverageSessionModel(data.data);
  } catch (error) {
    console.error('Erreur API (sessions moyennes):', error);
    throw error;
  }
};

export const fetchUserPerformance = async (userId) => {
  try {
    const data = await fetchData(`/user/${userId}/performance`, mockPerformanceData.find(performance => performance.userId === parseInt(userId)));
    console.log('Données de performance reçues:', data);
    return new PerformanceModel(data.data);
  } catch (error) {
    console.error('Erreur API (performance):', error);
    throw error;
  }
};

export const fetchAllUserData = async (userId) => {
  try {
    const [userData, activityData, averageSessionsData, performanceData] = await Promise.all([
      fetchUserData(userId),
      fetchUserActivity(userId),
      fetchUserAverageSessions(userId),
      fetchUserPerformance(userId)
    ]);

    return {
      userData,
      activityData,
      averageSessionsData,
      performanceData
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};