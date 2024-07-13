import React, { useEffect, useState } from 'react';
import { fetchUserData } from './service/api';
import { Link } from 'react-router-dom';
import './assets/components/home.scss';
import { mockUserData } from './mock/data';


function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userIds = [12, 18];
                const usersData = await Promise.all(userIds.map(id => fetchUserData(id)));
                const formattedUsers = usersData.map(user => user.data); // Accéder aux données à l'intérieur de l'objet retourné
                setUsers(formattedUsers);
            } catch (err) {
                console.error('Erreur lors de la récupération des utilisateurs:', err);
                setUsers(mockUserData);
            }
        };

        loadUsers();
    }, []);

    return (
        <div className="main-container">
            {users.map(user => (
                <Link to={`/dashboard/${user.id}`} key={user.id} className="user-card">
                    <div className="user-info">
                        <p>{user.userInfos.firstName} {user.userInfos.lastName}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Home;
