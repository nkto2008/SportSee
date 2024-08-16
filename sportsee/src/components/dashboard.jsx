import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllUserData } from '../service/api';
import ActivityChart from './ActivityChart';
import SessionDurationChart from './SessionDurationChart';
import PerformanceRadarChart from './PerformanceRadarChart';
import ScoreChart from './ScoreChart';
import '../assets/components/dashboard.scss';
import CardInfo from './CardInfo';

function Dashboard() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAllUserData(userId);
                setUserData(data);
            } catch (err) {
                console.error("Erreur lors de la récupération des données:", err);
                setError("Impossible de récupérer les données. Veuillez réessayer plus tard.");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [userId]);

    if (isLoading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!userData) return <div>Aucune donnée utilisateur disponible.</div>;

    const { userData: user, activityData, averageSessionsData, performanceData } = userData;

    return (
        <div id="profile">
            <div className='header'>
                <h1>Bonjour <span className='name'>{user.userInfos.firstName}</span></h1>
                <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </div>
            <div className='container'>
                <div className='wrapper-left'>
                    <div className='wrap-activity'>
                        {activityData && activityData.sessions && (
                            <ActivityChart data={activityData.sessions} />
                        )}
                    </div>
                    <div className='wrap'>
                        <div className='chart-container'>
                            {averageSessionsData && averageSessionsData.sessions && (
                                <SessionDurationChart data={averageSessionsData.sessions} />
                            )}
                        </div>
                        <div className='chart-container'>
                            {performanceData && performanceData.data && (
                                <PerformanceRadarChart data={performanceData.data} />
                            )}
                        </div>
                        <div className='chart-container'>
                            <ScoreChart score={user.getScore()} />
                        </div>
                    </div>
                </div>
                <div className='wrapper-right'>
                    <CardInfo type="Calories" value={user.keyData.calorieCount} />
                    <CardInfo type="Protéines" value={user.keyData.proteinCount} />
                    <CardInfo type="Glucides" value={user.keyData.carbohydrateCount} />
                    <CardInfo type="Lipides" value={user.keyData.lipidCount} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;