const API_BASE_URL = 'http://localhost:3000';

export const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données utilisateur');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
};
export const fetchUserActivity = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.sessions.map(session => ({
            day: session.day,
            kilogram: session.kilogram,
            calories: session.calories
        }));
    } catch (error) {
        console.error('Erreur API (activité):', error);
        throw error;
    }
};

export const fetchUserAverageSessions = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.sessions.map(session => ({
            day: session.day,
            sessionLength: session.sessionLength
        }));
    } catch (error) {
        console.error('Erreur API (sessions moyennes):', error);
        throw error;
    }
};

export const fetchUserPerformance = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/performance`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
            userId: data.data.userId,
            kind: data.data.kind,
            data: data.data.data
        };
    } catch (error) {
        console.error('Erreur API (performance):', error);
        throw error;
    }
};
