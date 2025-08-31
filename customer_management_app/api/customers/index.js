import { openDB } from '../db';

export default async function handler(req, res) {
  const db = await openDB();

  if (req.method === 'GET') {
    try {
      const customers = await db.all('SELECT * FROM customers');
      res.status(200).json({ data: customers });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } 
  else if (req.method === 'POST') {
    const { first_name, last_name, phone_number } = req.body;
    if (!first_name || !last_name || !phone_number) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    try {
      const result = await db.run(
        'INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)',
        [first_name, last_name, phone_number]
      );
      res.status(201).json({ id: result.lastID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } 
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
