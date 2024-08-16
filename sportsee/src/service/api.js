import { UserModel, ActivityModel, AverageSessionModel, PerformanceModel } from '../model/user';
import { mockUserData, mockActivityData, mockAverageSessionsData, mockPerformanceData } from '../mock/data';

let api = true
const API_BASE_URL = process.env.API_BASE_URL;
if (process.env.USE_API) {
  api = true
}else {
  api = false
}

console.log('Valeur actuelle de process.env.api:', process.env.USE_API);
console.log('Valeur actuelle de process.env.api:', api);
console.log('Mode API:', api ? 'Activé' : 'Désactivé');
console.log('api (type):', typeof api);
const fetchData = async (url) => {
  if (!api) {
    throw new Error("L'application est configurée pour utiliser l'API, mais api est false.");
  }
  
  console.log('Appel à l\'API réelle:', `${API_BASE_URL}${url}`);
  const response = await fetch(`${API_BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchUserData = async (userId) => {
  try {
    const data = api
      ? await fetchData(`/user/${userId}`)
      : { data: mockUserData.find(user => user.id === parseInt(userId)) };
    return new UserModel(data.data);
  } catch (error) {
    console.error('Erreur API (utilisateur):', error);
    throw error;
  }
};

export const fetchUserActivity = async (userId) => {
  try {
    const data = api
      ? await fetchData(`/user/${userId}/activity`)
      : { data: mockActivityData.find(activity => activity.userId === parseInt(userId)) };
    return new ActivityModel(data.data);
  } catch (error) {
    console.error('Erreur API (activité):', error);
    throw error;
  }
};

export const fetchUserAverageSessions = async (userId) => {
  try {
    const data = api
      ? await fetchData(`/user/${userId}/average-sessions`)
      : { data: mockAverageSessionsData.find(session => session.userId === parseInt(userId)) };
    return new AverageSessionModel(data.data);
  } catch (error) {
    console.error('Erreur API (sessions moyennes):', error);
    throw error;
  }
};

export const fetchUserPerformance = async (userId) => {
  try {
    const data = api
      ? await fetchData(`/user/${userId}/performance`)
      : { data: mockPerformanceData.find(performance => performance.userId === parseInt(userId)) };
    return new PerformanceModel(data.data);
  } catch (error) {
    console.error('Erreur API (performance):', error);
    throw error;
  }
};

const getMockData = (mockDataArray, userId) => {
  const data = mockDataArray.find(item => item.id === parseInt(userId) || item.userId === parseInt(userId));
  if (!data) {
    throw new Error(`Données mockées non trouvées pour l'utilisateur ${userId}`);
  }
  return { data };
};

export const fetchAllUserData = async (userId) => {
  try {
    if (api) {
      console.log('Récupération des données depuis l\'API');
      const [userData, activityData, averageSessionsData, performanceData] = await Promise.all([
        fetchData(`/user/${userId}`),
        fetchData(`/user/${userId}/activity`),
        fetchData(`/user/${userId}/average-sessions`),
        fetchData(`/user/${userId}/performance`)
      ]);

      return {
        userData: new UserModel(userData.data),
        activityData: new ActivityModel(activityData.data),
        averageSessionsData: new AverageSessionModel(averageSessionsData.data),
        performanceData: new PerformanceModel(performanceData.data)
      };
    } else {
      console.log('Utilisation des données mockées');
      return {
        userData: new UserModel(getMockData(mockUserData, userId).data),
        activityData: new ActivityModel(getMockData(mockActivityData, userId).data),
        averageSessionsData: new AverageSessionModel(getMockData(mockAverageSessionsData, userId).data),
        performanceData: new PerformanceModel(getMockData(mockPerformanceData, userId).data)
      };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(`Impossible de récupérer les données de l'utilisateur. ${api ? "Veuillez vérifier la connexion à l'API." : "Erreur avec les données mockées."}`);
  }
};