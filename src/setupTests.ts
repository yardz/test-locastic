// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { cache } from 'swr';
import axios from 'axios';
import { baseURL } from './test-utils';

beforeAll(() => {
	axios.defaults.baseURL = baseURL;
});
afterEach(() => {
	cache.clear();
});
