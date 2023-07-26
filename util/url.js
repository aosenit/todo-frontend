/* eslint-disable no-undef */

const baseUrl = import.meta.env.VITE_BASE_URL;
const loginUrl = `${baseUrl}/auth/login`;
const signupUrl = `${baseUrl}/auth/signup`;
const getAllTodosUrl = `${baseUrl}/todos`;
const createTodoUrl = `${baseUrl}/todo`;

export { baseUrl, loginUrl, signupUrl, getAllTodosUrl, createTodoUrl };
