// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Currency} from "../../types/calculator/currency";

type Data = {
  currencies: Array<Currency>;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    currencies: [
      {
        country: 'Poland',
        currencyCode: 'PLN',
        currency: 'Zlot',
        max: 20000,
      },
      {
        country: 'Germany',
        currencyCode: 'EUR',
        currency: 'Euro',
        max: 5000,
      },
      {
        country: 'Great Britain',
        currencyCode: 'GBP',
        currency: 'British Pound',
        max: 1000,
      },
      {
        country: 'Ukraine',
        currencyCode: 'UAH',
        currency: 'Hrivna',
        max: 50000,
      },
    ]
  })
}
