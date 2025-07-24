import { insertProperty } from '../lib/db.js';
import * as cheerio from 'cheerio';

const PAGE_LIMIT = 10;

async function scrapeProperty24() {
  console.log('Scraping Property24...');
  const baseUrl = 'https://www.property24.com/for-sale/pinelands/cape-town/western-cape/8017';
  let totalScraped = 0;

  for (let page = 1; page <= PAGE_LIMIT; page++) {
    const url = page === 1 ? baseUrl : `${baseUrl}/p${page}`;
    console.log(`Scraping Property24 page ${page}...`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });


    const html = await response.text();
    const $ = cheerio.load(html);

    const propertyCards = $('.p24_proTile, .p24_regularTile');

    if (propertyCards.length === 0) {
      console.log(`No more properties found on Property24 page ${page}. Stopping.`);
      break;
    }

    console.log(`Found ${propertyCards.length} properties on Property24 page ${page}`);

    const properties = [];
    propertyCards.each((i, el) => {
      const location = $(el).find('.p24_location').text().trim();
      const price = $(el).find('.p24_price').text().trim();
      var url = $(el).children('a').attr('href');
      var title = el.attribs.title;
      var imageUrl = $(el).find('img.js_P24_listingImage').attr('src');
      var size = $(el).find('.p24_size').find('span:contains("m²")').text().trim().replace(/\D/g, "");
      

      // if this is a regular listing, not a promo listing
      if (!title) {
        title = $(el).find('.p24_title').text().trim();
        if (!title) {
          console.log(el);
          console.log(`Unable to get title! ${$(el).children().length}`);
          return;
        }
      }
      if (!imageUrl || imageUrl === '/blank.gif') {
        imageUrl = $(el).find('img.js_P24_listingImage').attr('lazy-src');
      }
      if (!url) {
        url = $(el).find(".js_listingTileImageHolder").children('a').attr('href');
      }
      
      // print all variables above:
      // console.log('title:', title);
      // console.log('location:', location);
      // console.log('price:', price);
      // console.log('url:', url);
      // console.log('imageUrl:', imageUrl);
      // console.log('size:', size);

      if (title && location && price && url && imageUrl) {
        properties.push({
          title,
          location,
          price,
          imageUrl,
          url: `https://www.property24.com${url}`,
        });
      }
      else {
        console.log(`Unable to get properties of property: title=${title}, location=${location}, price=${price}, url=${url}, imageUrl=${imageUrl}`);
      }
    });

    for (const property of properties) {
      await insertProperty(property);
    }
    totalScraped += properties.length;

    if (page === PAGE_LIMIT) {
      console.log(`Warning: Paging limit reached for Property24. Consider increasing it. Page_limit=${PAGE_LIMIT}`);
      break;
    }
  }

  return totalScraped;
}

async function scrapePrivateProperty() {
  console.log('Scraping Private Property...');
  const baseUrl = 'https://www.privateproperty.co.za/for-sale/western-cape/cape-town/southern-suburbs/pinelands/800';
  let totalScraped = 0;

  for (let page = 1; page <= PAGE_LIMIT; page++) {
    const url = `${baseUrl}?page=${page}`;
    console.log(`Scraping Private Property page ${page}...`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (response.redirected) {
      console.log("Redirect means that Paging limit reached for Private Property. Stopping.");
      break;
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const propertyCards = $('.listing-result');

    if (propertyCards.length === 0) {
      console.log(`No more properties found on Private Property page ${page}. Stopping.`);
      break;
    }

    console.log(`Found ${propertyCards.length} properties on Private Property page ${page}.`);

    const properties = [];
    propertyCards.each((i, el) => {
      const card = $(el);
      const url = card.attr('href');
      const title = card.attr('title');
      const location = card.find('.listing-result__address').text().replace(/(\r\n|\n|\r)/gm, "").trim();
      const price = card.find('.listing-result__price').text().trim();
      const imageUrl = card.find('.listing-result__image').attr('src');
      const size = card.find('span:contains("m²")').text().trim().replace(/\D/g, "");

      if (title && price && url && imageUrl) {
        properties.push({
          title,
          location,
          price,
          imageUrl,
          url: `https://www.privateproperty.co.za${url}`,
          size: size ? parseInt(size) : null,
        });
      }
    });

    for (const property of properties) {
      await insertProperty(property);
    }
    totalScraped += properties.length;

    if (page === PAGE_LIMIT) {
      console.log(`Warning: Paging limit reached for Property24. Consider increasing it. Page_limit=${PAGE_LIMIT}`);
      break;
    }
  }

  return totalScraped;
}

export default async function handler(req, res) {
  try {
    const [p24Count, privatePropCount] = await Promise.all([
      scrapeProperty24(),
      scrapePrivateProperty()
    ]);
    const totalScraped = p24Count + privatePropCount;
    console.log( `Successfully scraped ${totalScraped} properties. ${p24Count} from Property24, ${privatePropCount} from Private Property.`);
    res.status(200).json({ message: `Successfully scraped ${totalScraped} properties. ${p24Count} from Property24, ${privatePropCount} from Private Property.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape properties' });
  }
}