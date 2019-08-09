import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import logo from '../assets/logo.svg';
import api from '../services/api';
import './Main.css';

export default function Main({ match }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUser() {
            const reponse = await api.get('/devs', {
                headers: { user: match.params.id }
            });
            setUsers(reponse.data);
        }
        loadUser();
    }, [match.params.id]);

    async function handleLikes(id) {
        await api.post(`devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislikes(id) {
        await api.post(`devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>

            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button onClick={() => handleLikes(user._id)}>
                                    <img src={like} alt="" />
                                </button>
                                <button
                                    onClick={() => handleDislikes(user._id)}
                                >
                                    <img src={dislike} alt="" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">Acabou :c</div>
            )}
        </div>
    );
}
