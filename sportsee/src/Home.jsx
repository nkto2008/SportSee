import React, { useEffect, useState } from 'react';
import { fetchUserData } from './service/api';
import { Link } from 'react-router-dom';
import './assets/components/home.scss';

function Home() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userIds = [12, 18];
                const usersData = await Promise.all(userIds.map(id => fetchUserData(id)));
                setUsers(usersData);
            } catch (err) {
                console.error('Erreur lors de la récupération des utilisateurs:', err);
                setError("Impossible de charger les données utilisateur.");
            } finally {
                setIsLoading(false);
            }
        };

        loadUsers();
    }, []);

    if (isLoading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="main-container">
            {users.map(user => (
                user && user.userInfos ? (
                    <Link to={`/dashboard/${user.id}`} key={user.id} className="user-card">
                        <div className="user-info">
                            <p>{user.userInfos.firstName} {user.userInfos.lastName}</p>
                        </div>
                    </Link>
                ) : null
            ))}
        </div>
    );
}

export default Home;