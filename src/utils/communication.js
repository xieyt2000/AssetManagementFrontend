import React from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../utils/api';

export function register(payload){
    return axios.post(API_BASE_URL+'/user/register', payload);
}


export function login(payload){
    return axios.post(API_BASE_URL+'/user/login', payload);
}