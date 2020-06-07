import dotenv from 'dotenv';
import { google, oAuth2Client } from '../index';
import {
  SellRequest,
  BuyRequest,
} from '../models';
import {
  pagination,
  search,
} from '../helpers';

dotenv.config();

class Phones {
  static save(request, response) {
    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: request.buyRequest ? process.env.BUYREQUEST : process.env.SELLREQUEST,
      majorDimension: 'ROWS',
    }, async (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const storageAndPhonePrices = res.data.values;

      let phoneName = '';
      const grades = ['New', 'A1', 'A2', 'B1', 'B2',
        'C', 'C/B', 'C/D'];
      let phones = [];

      for (let i = 0; i < storageAndPhonePrices.length; i++) {
        if (storageAndPhonePrices[i].length === 1) {
          phoneName = storageAndPhonePrices[i][0];
        } else if (storageAndPhonePrices[i].includes('New')) {
          continue;
        } else {
          grades.map((gradesValue, index) => {
            const phone = {
              name: phoneName,
              grade: gradesValue,
              storageSize: storageAndPhonePrices[i][1],
              price: storageAndPhonePrices[i][index + 2].split('$').join(''),
            };

            phones = [
              ...phones,
              phone,
            ];
          });
        }
      }

      try {
        const buyRequest = await BuyRequest.find();
        const sellRequest = await SellRequest.find();

        if (sellRequest.length && buyRequest.length) {
          return response.status(409).json({
            status: 409,
            data: {
              message: 'phones previously saved',
            }
          });
        } else {
          let phoneRequest;
          if (request.buyRequest && request.buyRequest === 'buyrequest') {
            phoneRequest = new BuyRequest({ phones: phones.flat() });
          } else {
            phoneRequest = new SellRequest({ phones: phones.flat() });
          }

          phoneRequest.save();

          return response.status(201).json({
            status: 201,
            data: {
              message: 'phones saved successfully',
              phones
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  static async fetch(request, response) {
    const searchString = request.query.search;
    const limit = request.query.limit;
    const page = request.query.page;
    const type = request.query.type;
    const min = request.query.min;
    const max = request.query.max;

    let phoneRequest;
    if (type && type === 'buyrequest') {
      phoneRequest = await BuyRequest.find();
    } else {
      phoneRequest = await SellRequest.find();
    }

    if (!phoneRequest) {
      return response.status(404).json({
        status: 404,
        data: {
          message: 'no phone found that match search string',
          phones: []
        }
      });
    } else {
      return response.status(200).json({
        status: 200,
        data: {
          message: 'phones returned successfully',
          phones: pagination(limit, page, searchString ? search(phoneRequest[0].phones, searchString) : search(phoneRequest[0].phones, '', min, max))
        }
      });
    }
  }
}

export default Phones;
