import { openDB } from '../db';

export default async function handler(req, res) {
  const db = await openDB();

  if (req.method === 'GET') {
    // Optional filter by customerId
    const customerId = req.query.customerId;
    let rows;
    if (customerId) {
      rows = await db.all('SELECT * FROM addresses WHERE customer_id = ?', [customerId]);
    } else {
      rows = await db.all('SELECT * FROM addresses');
    }
    res.status(200).json({ data: rows });
  } 
  else if (req.method === 'POST') {
    const { customer_id, address_details, city, state, pin_code } = req.body;
    if (!customer_id || !address_details || !city || !state || !pin_code) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    try {
      const result = await db.run(
        'INSERT INTO addresses (customer_id, address_details, city, state, pin_code) VALUES (?, ?, ?, ?, ?)',
        [customer_id, address_details, city, state, pin_code]
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
