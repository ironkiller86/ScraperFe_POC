import axios from 'axios';
import { useState } from 'react';

export const useLoadingApp = () => {
    const [waiting, setWaiting] = useState(true);
    const [token, setToken] = useState(null);
    const [auth, setAuth] = useState(false);
    const fetchData = async (tokenInStorage) => {
        console.log('fetchData', token);
        let resp = null;
        try {
            resp = await axios.get('http://localhost:8000/users/accountInfo', {
                validateStatus: function (status) {
                    return status >= 200 && status <= 500; // default
                },
                headers: { Authorization: `Bearer ${tokenInStorage}` },
            });
        } catch (err) {
            //Do nothing
            console.log('useLoadingApp cath', err);
        }
        setWaiting(false);
        console.log('useLoadingApp', resp.data._id);
        if (resp.data._id) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    };

    return { waiting, setWaiting, setToken, token, fetchData, auth };
};

export const useTokenStorage = () => {
    const addToken = (token) => {
        localStorage.setItem('token', token);
    };
    const tokenInStorage = localStorage.getItem('token');
    return { addToken, tokenInStorage };
};
