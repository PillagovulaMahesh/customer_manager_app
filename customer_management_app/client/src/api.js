// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // points to Vercel serverless functions
});

export default API;
