
import { sql } from '@vercel/postgres';

export async function insertProperty(property) {
  return await sql`
    INSERT INTO properties (title, location, price, imageUrl, url)
    VALUES (${property.title}, ${property.location}, ${property.price}, ${property.imageUrl}, ${property.url})
    ON CONFLICT (url) DO NOTHING;
  `;
}

export async function getProperties() {
  return await sql`SELECT * FROM properties ORDER BY createdAt DESC;`;
}

export async function updatePropertyStatus(id, status) {
  const { viewedOnline, contactedAgent, viewedProperty, madeOffer } = status;
  return await sql`
    UPDATE properties
    SET
      viewedOnline = ${viewedOnline},
      contactedAgent = ${contactedAgent},
      viewedProperty = ${viewedProperty},
      madeOffer = ${madeOffer}
    WHERE id = ${id};
  `;
}
