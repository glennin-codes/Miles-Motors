import client from './client';

/** POST /send - FirstName, LastName, email, number, message */
export async function sendContact({ FirstName, LastName, email, number, message }) {
  const { data } = await client.post('/send', {
    FirstName,
    LastName,
    email,
    number,
    message,
  });
  return data;
}

/** Admin: GET /contacts - list all contact form submissions */
export async function getContacts() {
  const { data } = await client.get('/contacts');
  return Array.isArray(data) ? data : [];
}
