import { openDB } from '../db';

export default async function handler(req, res) {
  const db = await openDB();
  const { id } = req.query; // dynamic route [id]

  if (req.method === 'GET') {
    const customer = await db.get('SELECT * FROM customers WHERE id = ?', [id]);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json(customer);
  } 
  else if (req.method === 'PUT') {
    const { first_name, last_name, phone_number } = req.body;
    if (!first_name || !last_name || !phone_number) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    try {
      await db.run(
        'UPDATE customers SET first_name=?, last_name=?, phone_number=? WHERE id=?',
        [first_name, last_name, phone_number, id]
      );
      res.status(200).json({ message: 'Customer updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } 
  else if (req.method === 'DELETE') {
    try {
      await db.run('DELETE FROM customers WHERE id=?', [id]);
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } 
  else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
