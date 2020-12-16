const baseUrl =
  // TODO: switch if using local
  'https://secure-garden-32902.herokuapp.com';
// 'http://localhost:4000';

export const fetchJSON = async (filename) => {
  const endpoint = `${baseUrl}/data/${filename}`;
  const res = await fetch(endpoint);
  const { vectors } = await res.json();
  return vectors;
};

export const nearestWord = async (word) => {
  const endpoint = `${baseUrl}/nearest/word`;
  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ word }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).catch((err) => console.log('ERR', err));

  const nearest = await res.json();
  return nearest;
};

export const nearestSent = async (sent) => {
  const endpoint = `${baseUrl}/nearest/dracula`;
  console.log('SENT', sent);
  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ sent }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).catch((err) => console.log('ERR', err));

  const nearest = await res.json();
  return nearest;
};

// OBJ sent (string)
//     dataSet (string)
export const isSentBelief = async (sent, dataSet) => {
  const endpoint = `${baseUrl}/nearest/sentence`;
  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ sent, dataSet }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).catch((err) => console.log('ERR', err));

  const nearest = await res.json();
  return nearest;
};

export const getSentsFromUrl = async (url) => {
  const endpoint = `${baseUrl}/webpage/parse`;
  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ url }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).catch((err) => console.log('ERR', err));

  const data = await res.json();
  return data;
};

export const saveSent = async (sent, belief) => {
  const endpoint = `${baseUrl}/data/belief`;
  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ sent, belief }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).catch((err) => console.log('ERR', err));

  const data = await res.text();
  return data;
};
