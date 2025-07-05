import { getProperties } from '../lib/db';

export default async function handler(req, res) {
  try {
    const properties = await getProperties();
    res.status(200).json(properties.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
}