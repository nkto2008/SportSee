import React, { useState, useEffect } from 'react';
import { fetchUserData, fetchUserActivity, fetchUserAverageSessions, fetchUserPerformance } from '../service/api';
import { mockUserData, mockActivityData, mockAverageSessionsData, mockPerformanceData } from '../mock/data';
import ActivityChart from './ActivityChart';
import SessionDurationChart from './SessionDurationChart';
import PerformanceRadarChart from './PerformanceRadarChart';
import ScoreChart from './ScoreChart';
import '../assets/components/dashboard.scss';
import CardInfo from './CardInfo';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [averageSessionsData, setAverageSessionsData] = useState(null);
    const [performanceData, setPerformanceData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const userId = 13; //Rendre cette partie dynamique. ( A voir)
                const [user, activity, averageSessions, performance] = await Promise.all([
                    fetchUserData(userId),
                    fetchUserActivity(userId),
                    fetchUserAverageSessions(userId),
                    fetchUserPerformance(userId)
                ]);

                setUserData(user.data);
                setActivityData(activity);
                setAverageSessionsData(averageSessions);
                setPerformanceData(performance);
            } catch (err) {
                console.error("Erreur lors de la récupération des données:", err);
                setError("Impossible de récupérer les données de l'API. Affichage des données de démonstration.");

                // Utilisation des mocks en cas d'erreur
                setUserData(mockUserData);
                setActivityData(mockActivityData);
                setAverageSessionsData(mockAverageSessionsData);
                setPerformanceData(mockPerformanceData);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!userData) {
        return <div>Aucune donnée utilisateur disponible.</div>;
    }
/*
    return (
        <div className="dashboard">
            {error && <div className="error-message">{error}</div>}
            <h1>Bonjour {userData.userInfos?.firstName || 'Utilisateur'}</h1>

            <ActivityChart data={activityData} />
            <SessionDurationChart data={averageSessionsData} />
            <PerformanceRadarChart data={performanceData?.data} />
            <ScoreChart score={userData.todayScore || userData.score} />

            <div>Calories: {userData.keyData?.calorieCount || 'N/A'} kCal</div>
            <div>Protéines: {userData.keyData?.proteinCount || 'N/A'} g</div>
            <div>Glucides: {userData.keyData?.carbohydrateCount || 'N/A'} g</div>
            <div>Lipides: {userData.keyData?.lipidCount || 'N/A'} g</div>
        </div>
    );*/
    return (
        <div id="profile">
            <div className='header'>
                <h1>Bonjour <span className='name'>{userData.userInfos?.firstName}</span></h1>
                <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </div>
            <div className='container'>
                <div className='wrapper-left'>
                    <div className='wrap-activity'>
                        <ActivityChart data={activityData} />
                    </div>
                    <div className='wrap'>
                        <div className='chart-container'>
                            <SessionDurationChart data={averageSessionsData} />
                        </div>
                        <div className='chart-container'>
                            <PerformanceRadarChart data={performanceData?.data} />
                        </div>
                        <div className='chart-container'>
                            <ScoreChart score={userData.todayScore} />
                        </div>
                    </div>
                </div>
                <div className='wrapper-right'>
                    <CardInfo type="Calories" value={userData.keyData?.calorieCount} />
                    <CardInfo type="Protéines" value={userData.keyData.proteinCount} />
                    <CardInfo type="Glucides" value={userData.keyData.carbohydrateCount} />
                    <CardInfo type="Lipides" value={userData.keyData.lipidCount} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;