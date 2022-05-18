import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGOUT,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
} from './types';

import axios from 'axios';

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)
            if (res.data.code !== 'token_not_valid'){
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                }); 
            }else{
                dispatch({
                    type: AUTHENTICATED_FAIL
                });  
            }
        } catch(err){
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    }else{
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')){        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };


        
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
            
            localStorage.setItem('userName', res.data.name);
            localStorage.setItem('userId', res.data.id);
            
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        }catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    }else{
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};


export const login = (email,password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body,config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        

        dispatch(load_user());

    }catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const signup = (name, lastName ,email, phoneNumber, password, re_password, isAdmin) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const userConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ name, email, password, re_password });

    try{
        let user = {};
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body,config)
                        .then((el)=> {
                            user = {name: el.data.name,  last_name: lastName,  phone_number: phoneNumber, 
                                profile_image: 'https://pngimg.com/uploads/letter_r/letter_r_PNG93904.png', 
                                email: el.data.email, uid: el.data.id, appointments: [], calendar: {}, is_admin: isAdmin};
                        });
        
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users_clients/`, user);
        
 
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });

        

    }catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body,config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });

    }catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
    }
}

export const logout = () => dispatch => {
                
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    dispatch({
        type: LOGOUT
    });
}