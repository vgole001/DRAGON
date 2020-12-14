const secure = process.env.REACT_APP_SECURE;
const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT = process.env.REACT_APP_API_PORT;

const httpScheme = (secure === true) ? "https" : "http"
const wsScheme = (secure === true) ? "wss" : "ws"

const API_URL = `${API_HOST}:${API_PORT}`;
const EVENTS_API = '10.10.10.108:8082'

export const apiBaseUrl = `${httpScheme}://${API_URL}/`;
export const wsBaseUrl = `${wsScheme}://${API_URL}/ws/`;
export const eventsBaseUrl = `http://${EVENTS_API}/`

//const API_HOST = 'http://api-dev-opapsports.vermantiagaming.com/'
//const API_PORT = 80