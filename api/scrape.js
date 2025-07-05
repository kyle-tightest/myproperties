import { insertProperty } from '../../lib/db';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {

    const response = await fetch('https://www.property24.com/for-sale/cape-town/western-cape/432');
    const html = await response.text();
    const $ = cheerio.load(html);

    const properties = [];
    $('.js_result_card').each((i, el) => {
      const title = $(el).find('.p24_title').text().trim();
      const location = $(el).find('.p24_location').text().trim();
      const price = $(el).find('.p24_price').text().trim();
      const url = $(el).find('.p24_image-link').attr('href');
      const imageUrl = $(el).find('.p24_image').attr('src');

      if (title && location && price && url && imageUrl) {
        properties.push({
          title,
          location,
          price,
          imageUrl,
          url: `https://www.property24.com${url}`,
        });
      }
    });

    for (const property of properties) {
      await insertProperty(property);
    }

    res.status(200).json({ message: `Successfully scraped ${properties.length} properties.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape properties' });
  }
}