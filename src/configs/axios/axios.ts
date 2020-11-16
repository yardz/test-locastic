import axios from 'axios';

const baseUrl: string = process.env.REACT_APP_API || '';
const TIMEOUT = 60 * 1000;

export const axiosFunctions = axios.create();

export const configAxios = () => {
	axios.defaults.baseURL = baseUrl;
	axios.defaults.timeout = TIMEOUT;
};
