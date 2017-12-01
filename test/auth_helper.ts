import fetch from 'node-fetch';

export const login = (username: string, password: string) => {
  return fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
