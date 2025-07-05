
import { updatePropertyStatus } from '../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id, status } = req.body;
    await updatePropertyStatus(id, status);
    res.status(200).json({ message: 'Property status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update property status' });
  }
}
