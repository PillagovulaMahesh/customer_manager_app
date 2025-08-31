import { openDB } from '../db';

export default async function handler(req, res) {
  const db = await openDB();
  const { id } = req.query; // dynamic route [id]

  if (req.method === 'GET') {
    const address = await db.get('SELECT * FROM addresses WHERE id = ?', [id]);
    if (!address) return res.status(404).json({ error: 'Address not found' });
    res.status(200).json(address);
  } 
  else if (req.method === 'PUT') {
    const { address_details, city, state, pin_code } = req.body;
    if (!address_details || !city || !state || !pin_code) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    await db.run(
      'UPDATE addresses SET address_details=?, city=?, state=?, pin_code=? WHERE id=?',
      [address_details, city, state, pin_code, id]
    );
    res.status(200).json({ message: 'Address updated successfully' });
  } 
  else if (req.method === 'DELETE') {
    await db.run('DELETE FROM addresses WHERE id=?', [id]);
    res.status(200).json({ message: 'Address deleted successfully' });
  } 
  else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
