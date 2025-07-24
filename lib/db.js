
import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });


export async function insertProperty(property) {
  return await sql`
    INSERT INTO properties (title, location, price, imageUrl, url, size)
    VALUES (${property.title}, ${property.location}, ${property.price}, ${property.imageUrl}, ${property.url}, ${property.size})
    ON CONFLICT (url) DO NOTHING;
  `;
}

export async function getProperties() {
  return await sql`SELECT * FROM properties ORDER BY createdAt DESC;`;
}

export async function updatePropertyStatus(id, status) {
  const { viewedonline, contactedagent, viewedproperty, madeoffer } = status;
  return await sql`
    UPDATE properties
    SET
      viewedonline = COALESCE(${viewedonline}, viewedonline),
      contactedagent = COALESCE(${contactedagent}, contactedagent),
      viewedproperty = COALESCE(${viewedproperty}, viewedproperty),
      madeoffer = COALESCE(${madeoffer}, madeoffer)
    WHERE id = ${id};
  `;
}
